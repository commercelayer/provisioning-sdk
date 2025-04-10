
import apiSchema, { Resource, Operation, Component, Cardinality, Attribute, isObjectType } from './schema'
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'fs'
import { basename } from 'node:path'
import Fixer from './fixer'
import Inflector from './inflector'
import { updateLicense } from './license'


/**** SDK source code generator settings ****/
export const CONFIG = {
	RELATIONSHIP_FUNCTIONS: true,
	TRIGGER_FUNCTIONS: true,
	ACTION_FUNCTIONS: true,
	LEAZY_LOADING: true,
	LOCAL: false,
	MICRO_CLIENTS: true
}
/**** **** **** **** **** **** **** **** ****/


const RESOURCE_COMMON_FIELDS = ['type', 'id', 'reference', 'reference_origin', 'metadata', 'created_at', 'updated_at']


type OperationType = 'retrieve' | 'list' | 'create' | 'update' | 'delete'

type ApiRes = {
	type: string
	apiClass: string
	models: Array<String>
	singleton: boolean
	operations: Array<OperationType>
	taggable: boolean
	versionable: boolean
}


const templates: { [key: string]: string } = {}

const global: {
	version?: string
	singletons: Record<string, string>
} = { singletons: {} }



const loadTemplates = (): void => {
	const tplDir = './gen/templates'
	const tplList = readdirSync(tplDir, { encoding: 'utf-8' }).filter(f => f.endsWith('.tpl'))
	tplList.forEach(t => {
		const tplName = basename(t).replace('.tpl', '')
		const tpl = readFileSync(`${tplDir}/${tplName}.tpl`, { encoding: 'utf-8' })
		templates[tplName] = tpl
	})
}


const generate = async (localSchema?: boolean) => {

	console.log('>> Local schema: ' + (localSchema || false) + '\n')
	CONFIG.LOCAL = localSchema || false

	if (!localSchema) {

		let currentVersion = '0.0.0'

		try {
			const currentSchema = apiSchema.current()
			currentVersion = currentSchema.info.version
		} catch (err) {
			console.log('No current local schema available')
		}

		const schemaInfo = await apiSchema.download()

		if (!schemaInfo) {
			console.log('Unable to download OpenAPI schema')
			return
		}
		else
			if (schemaInfo.version === currentVersion) {
				console.log('No new OpenAPI schema version: ' + currentVersion)
				return
			}
			else console.log(`New OpenAPI schema version: ${currentVersion} --> ${schemaInfo.version}`)

	}

	const schemaPath = apiSchema.localPath
	if (!existsSync(schemaPath)) {
		console.log('Cannot find schema file: ' + schemaPath)
		return
	}


	console.log('Generating SDK resources from schema ' + schemaPath)

	const schema = apiSchema.parse(schemaPath)
	global.version = schema.version


	// Remove redundant components and force usage of global resource component
	const fixedSchema = await Fixer.fixSchema(schema)
console.log(Object.keys(fixedSchema.resources))

	loadTemplates()

	// Initialize source dir
	const resDir = 'src/resources'
	if (existsSync(resDir)) rmSync(resDir, { recursive: true })
	mkdirSync(resDir, { recursive: true })

	// Initialize test dir
	const testDir = 'specs/resources'
	if (existsSync(testDir)) rmSync(testDir, { recursive: true })
	mkdirSync(testDir, { recursive: true })


	// Check singletons
	Object.entries(fixedSchema.resources).forEach(([type, res]) => {
		if (Object.values(res.operations).some(op => op.singleton)) {
			global.singletons[type] = Object.keys(res.components)[0]
		}
	})

	const resources: { [key: string]: ApiRes } = {}

	Object.entries(fixedSchema.resources).forEach(([type, res]) => {

		const name = Inflector.pluralize(Inflector.camelize(type)) as string

		const tplRes = generateResource(type, name, res)
		writeFileSync(`${resDir}/${type}.ts`, tplRes)
		console.log('Generated resource ' + name)

		const tplSpec = generateSpec(type, name, res)
		writeFileSync(`${testDir}/${type}.spec.ts`, tplSpec)
		console.log('Generated spec ' + name)


		const models = Object.keys(res.components)
		const singleton = Object.values(res.operations).some(op => op.singleton)
		const operations = Object.keys(res.operations).filter(op => ['retrieve', 'list', 'create', 'update', 'delete'].includes(op)) as OperationType[]
		const taggable = Object.keys(res.operations).includes('tags')
		const versionable = Object.keys(res.operations).includes('versions')

		resources[type] = {
			type,
			apiClass: name,
			models,
			singleton,
			operations: singleton ? [] : operations,
			taggable,
			versionable
		}

	})


	updateApiResources(resources)
	updateSdkInterfaces(resources)
	updateModelTypes(resources)
	// updateApiMicroClients(resources)

	updateLicense()

	console.log(`SDK generation completed [${global.version}].\n`)

}


const findLine = (str: string, lines: string[]): { text: string, index: number, offset: number } => {
	let idx = 0
	for (const l of lines) {
		const i = l.indexOf(str)
		if (i > -1) return { text: l, index: idx, offset: i }
		else idx++
	}
	return { text: '', index: -1, offset: -1 }
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tabsCount = (template: string): number => {
	return template.match(/##__TAB__##/g)?.length || 0
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tabsString = (num: number): string => {
	let str = ''
	for (let i = 0; i < num; i++) str += '\t'
	return str
}


const updateSdkInterfaces = (resources: { [key: string]: ApiRes }): void => {

	const filePath = 'src/commercelayer.ts'

	const cl = readFileSync(filePath, { encoding: 'utf-8' })

	const lines = cl.split('\n')

	// OpenAPI schema version
	if (global.version) {
		const schemaLine = findLine('const OPEN_API_SCHEMA_VERSION', lines)
		if (schemaLine.index >= 0) lines[schemaLine.index] = `const OPEN_API_SCHEMA_VERSION = '${global.version}'`
	}

	// Definitions
	const defTplLine = findLine('##__CL_RESOURCES_DEF_TEMPLATE::', lines)
	const defTplIdx = defTplLine.offset + '##__CL_RESOURCES_DEF_TEMPLATE::'.length + 1
	const defTpl = defTplLine.text.substring(defTplIdx)

	const definitions: string[] = []
	Object.entries(resources).forEach(([type, res]) => {
		const fieldName = res.singleton ? Inflector.singularize(type) : type
		let def = defTpl
		def = def.replace(/##__TAB__##/g, '\t')
		def = def.replace(/##__RESOURCE_TYPE__##/, fieldName)
		def = def.replace(/##__RESOURCE_CLASS__##/, res.apiClass)
		definitions.push(def)
	})

	const defStartIdx = findLine('##__CL_RESOURCES_DEF_START__##', lines).index + 2
	const defStopIdx = findLine('##__CL_RESOURCES_DEF_STOP__##', lines).index
	lines.splice(defStartIdx, defStopIdx - defStartIdx, ...definitions)


	// Initializations
	const iniTplLine = findLine('##__CL_RESOURCES_INIT_TEMPLATE::', lines)
	const iniTplIdx = iniTplLine.offset + '##__CL_RESOURCES_INIT_TEMPLATE::'.length + 1
	const iniTpl = iniTplLine.text.substring(iniTplIdx)

	const initializations: string[] = []
	if (!CONFIG.LEAZY_LOADING) Object.entries(resources).forEach(([type, res]) => {
		const fieldName = res.singleton? Inflector.singularize(type) : type
		let ini = iniTpl
		ini = ini.replace(/##__TAB__##/g, '\t')
		ini = ini.replace(/##__RESOURCE_TYPE__##/, fieldName)
		ini = ini.replace(/##__RESOURCE_CLASS__##/, res.apiClass)
		initializations.push(ini)
	})

	const iniStartIdx = findLine('##__CL_RESOURCES_INIT_START__##', lines).index + 2
	const iniStopIdx = findLine('##__CL_RESOURCES_INIT_STOP__##', lines).index
	lines.splice(iniStartIdx, iniStopIdx - iniStartIdx, ...initializations)


	// Leazy Loading
	const llTplLine = findLine('##__CL_RESOURCES_LEAZY_LOADING_TEMPLATE::', lines)
	const llTplIdx = llTplLine.offset + '##__CL_RESOURCES_LEAZY_LOADING_TEMPLATE::'.length + 1
	const llTpl = llTplLine.text.substring(llTplIdx)

	const leazyLoaders: string[] = []
	if (CONFIG.LEAZY_LOADING) Object.entries(resources).forEach(([type, res]) => {
		const fieldName = res.singleton? Inflector.singularize(type) : type
		let ll = llTpl
		ll = ll.replace(/##__TAB__##/g, '\t')
		ll = ll.replace(/##__RESOURCE_TYPE__##/g, fieldName)
		ll = ll.replace(/##__RESOURCE_CLASS__##/g, res.apiClass)
		leazyLoaders.push(ll)
	})

	const llStartIdx = findLine('##__CL_RESOURCES_LEAZY_LOADING_START__##', lines).index + 2
	const llStopIdx = findLine('##__CL_RESOURCES_LEAZY_LOADING_STOP__##', lines).index
	lines.splice(llStartIdx, llStopIdx - llStartIdx, ...leazyLoaders)


	writeFileSync(filePath, lines.join('\n'), { encoding: 'utf-8' })

	console.log('API interfaces generated.')

}


const updateModelTypes = (resources: { [key: string]: ApiRes }): void => {

	const filePath = 'src/model.ts'

	const cl = readFileSync(filePath, { encoding: 'utf-8' })

	const lines = cl.split('\n')

	// Exports
	const expTplLine = findLine('##__MODEL_TYPES_TEMPLATE::', lines)
	const expTplIdx = expTplLine.offset + '##__MODEL_TYPES_TEMPLATE::'.length + 1
	const expTpl = expTplLine.text.substring(expTplIdx)

	const exports: string[] = [copyrightHeader(templates.header)]
	const types: string[] = []

	Object.entries(resources).forEach(([type, res]) => {
		let exp = expTpl
		exp = exp.replace(/##__TAB__##/g, '\t')
		exp = exp.replace(/##__RESOURCE_TYPE__##/, type)
		exp = exp.replace(/##__RESOURCE_MODELS__##/, res.models.join(', '))
		exp = exp.replace(/##__RESOURCE_BASE_MODEL__##/g, String(res.models[0]))
		exports.push(exp)
		types.push(`\t'${type}'`)
	})

	const expStartIdx = findLine('##__MODEL_TYPES_START__##', lines).index + 2
	const expStopIdx = findLine('##__MODEL_TYPES_STOP__##', lines).index
	lines.splice(expStartIdx, expStopIdx - expStartIdx, ...exports)


	writeFileSync(filePath, lines.join('\n'), { encoding: 'utf-8' })

	console.log('Model types generated.')

}


const updateApiResources = (resources: { [key: string]: ApiRes }): void => {

	const filePath = 'src/api.ts'

	const cl = readFileSync(filePath, { encoding: 'utf-8' })

	const lines = cl.split('\n')

	// Exports
	const expTplLine = findLine('##__API_RESOURCES_TEMPLATE::', lines)
	const expTplIdx = expTplLine.offset + '##__API_RESOURCES_TEMPLATE::'.length + 1
	const expTpl = expTplLine.text.substring(expTplIdx)


	const exports: string[] = [copyrightHeader(templates.header)]
	const types: string[] = []

	const singletons: string[] = []
	const listables: string[] = []
	const creatables: string[] = []
	const updatables: string[] = []
	const deletables: string[] = []
	const taggables: string[] = []
	const versionables: string[] = []

	const fieldsets: string[] = []
	const sortables: string[] = []

	Object.entries(resources).forEach(([type, res]) => {

		let exp = expTpl
		exp = exp.replace(/##__TAB__##/g, '\t')
		exp = exp.replace(/##__RESOURCE_TYPE__##/, type)
		exp = exp.replace(/##__RESOURCE_CLASS__##/, res.apiClass)
		exp = exp.replace(/##__RESOURCE_MODEL__##/, Inflector.singularize(res.apiClass))
		exports.push(exp)

		const tabType = `\t'${type}'`
		types.push(tabType)

		if (res.singleton) singletons.push(tabType)
		if (res.operations.includes('list')) listables.push(tabType)
		if (res.operations.includes('create')) creatables.push(tabType)
		if (res.operations.includes('update')) updatables.push(tabType)
		if (res.operations.includes('delete')) deletables.push(tabType)
		if (res.taggable) taggables.push(tabType)
		if (res.versionable) versionables.push(tabType)

		fieldsets.push(`\t${res.type}: models.${Inflector.singularize(res.apiClass)}`)
		sortables.push(`\t${res.type}: models.${Inflector.singularize(res.apiClass)}Sort`)

	})

	const expStartIdx = findLine('##__API_RESOURCES_START__##', lines).index + 2
	const expStopIdx = findLine('##__API_RESOURCES_STOP__##', lines).index
	lines.splice(expStartIdx, expStopIdx - expStartIdx, ...exports)

	const typeStartIdx = findLine('##__API_RESOURCE_TYPES_START__##', lines).index + 1
	const typeStopIdx = findLine('##__API_RESOURCE_TYPES_STOP__##', lines).index
	lines.splice(typeStartIdx, typeStopIdx - typeStartIdx, types.join('\n|'))

	const resStartIdx = findLine('##__API_RESOURCE_LIST_START__##', lines).index + 1
	const resStopIdx = findLine('##__API_RESOURCE_LIST_STOP__##', lines).index
	lines.splice(resStartIdx, resStopIdx - resStartIdx, types.join(',\n'))

	const rsStartIdx = findLine('##__API_RESOURCE_SINGLETON_START__##', lines).index + 1
	const rsStopIdx = findLine('##__API_RESOURCE_SINGLETON_STOP__##', lines).index
	lines.splice(rsStartIdx, rsStopIdx - rsStartIdx, singletons.join(',\n'))

	/*
	const mapStartIdx = findLine('##__API_RESOURCE_MAP_START__##', lines).index + 1
	const mapStopIdx = findLine('##__API_RESOURCE_MAP_STOP__##', lines).index
	lines.splice(mapStartIdx, mapStopIdx - mapStartIdx,
		Object.keys(resources).map(t => `\t${t}: { name: '${Inflector.singularize(t)}', type: '${t}', api: '${t}' }`).join(',\n')
	)
	*/

	const rlStartIdx = findLine('##__API_RESOURCE_NOT_LISTABLE_START__##', lines).index + 1
	const rlStopIdx = findLine('##__API_RESOURCE_NOT_LISTABLE_STOP__##', lines).index
	lines.splice(rlStartIdx, rlStopIdx - rlStartIdx, singletons.join('\n|'))

	const rcStartIdx = findLine('##__API_RESOURCE_CREATABLE_START__##', lines).index + 1
	const rcStopIdx = findLine('##__API_RESOURCE_CREATABLE_STOP__##', lines).index
	lines.splice(rcStartIdx, rcStopIdx - rcStartIdx, creatables.join('\n|'))

	const ruStartIdx = findLine('##__API_RESOURCE_UPDATABLE_START__##', lines).index + 1
	const ruStopIdx = findLine('##__API_RESOURCE_UPDATABLE_STOP__##', lines).index
	lines.splice(ruStartIdx, ruStopIdx - ruStartIdx, updatables.join('\n|'))

	const rdStartIdx = findLine('##__API_RESOURCE_DELETABLE_START__##', lines).index + 1
	const rdStopIdx = findLine('##__API_RESOURCE_DELETABLE_STOP__##', lines).index
	lines.splice(rdStartIdx, rdStopIdx - rdStartIdx, deletables.join('\n|'))

	const rtStartIdx = findLine('##__API_RESOURCE_TAGGABLE_START__##', lines).index + 1
	const rtStopIdx = findLine('##__API_RESOURCE_TAGGABLE_STOP__##', lines).index
	lines.splice(rtStartIdx, rtStopIdx - rtStartIdx, taggables.join('\n|'))

	const rvStartIdx = findLine('##__API_RESOURCE_VERSIONABLE_START__##', lines).index + 1
	const rvStopIdx = findLine('##__API_RESOURCE_VERSIONABLE_STOP__##', lines).index
	lines.splice(rvStartIdx, rvStopIdx - rvStartIdx, versionables.join('\n|'))

	const rfStartIdx = findLine('##__API_RESOURCE_FIELDS_START__##', lines).index + 1
	const rfStopIdx = findLine('##__API_RESOURCE_FIELDS_STOP__##', lines).index
	lines.splice(rfStartIdx, rfStopIdx - rfStartIdx, fieldsets.join(',\n'))

	const sfStartIdx = findLine('##__API_RESOURCE_SORTABLE_FIELDS_START__##', lines).index + 1
	const sfStopIdx = findLine('##__API_RESOURCE_SORTABLE_FIELDS_STOP__##', lines).index
	lines.splice(sfStartIdx, sfStopIdx - sfStartIdx, sortables.join(',\n'))

	Fixer.fixHeadingEmptyLines(lines)

	writeFileSync('src/api.ts', lines.join('\n'), { encoding: 'utf-8' })

	console.log('API resources generated.')

}



const updateApiMicroClients = (resources: { [key: string]: ApiRes }): void => {

	const filePath = 'src/micro.ts'

	const cl = readFileSync(filePath, { encoding: 'utf-8' })

	const lines = cl.split('\n')

	const cltTpl = templates.client

	const clients: string[] = [copyrightHeader(templates.header)]

	if (CONFIG.MICRO_CLIENTS) {
		Object.entries(resources).forEach(([type, res]) => {
			let clt = cltTpl
			clt = clt.replace(/##__RESOURCE_CLASS__##/g, res.apiClass)
			clt = clt.replace(/##__RESOURCE_CLASS_INIT__##/g, Inflector.camelize(res.apiClass, true))
			clients.push(`${clt}\n`)
		})
	}

	const cltStartIdx = findLine('##__API_RESOURCES_MICRO_CLIENTS_START__##', lines).index + 1
	const cltStopIdx = findLine('##__API_RESOURCES_MICRO_CLIENTS_STOP__##', lines).index
	lines.splice(cltStartIdx, cltStopIdx - cltStartIdx, ...clients)

	writeFileSync(filePath, lines.join('\n'), { encoding: 'utf-8' })

	if (CONFIG.MICRO_CLIENTS) console.log('API micro clients generated.')
	else console.log('API micro clients generation skipped.')

}



const generateSpec = (type: string, name: string, resource: Resource): string => {

	let spec = templates.spec

	// Remove unsupported operations
	const lines = spec.split('\n')

	const allOperations = ['list', 'create', 'retrieve', 'update', 'delete', 'singleton']

	let singleton = false

	// Generate CRUD operations specs
	allOperations.forEach(op => {
		if (!Object.values(resource.operations).map(o => {
			if ((o.name === 'list') && o.singleton) {
				singleton = true
				return 'singleton'
			}
			else return o.name
		}).includes(op)) {
			const opStartIdx = findLine(`spec.${op}.start`, lines).index - 2
			const opStopIdx = findLine(`spec.${op}.stop`, lines).index + 2
			lines.splice(opStartIdx, opStopIdx - opStartIdx, '')
		}
	})

	spec = lines.join('\n')


	if (CONFIG.RELATIONSHIP_FUNCTIONS) {
		// Generate relationships operations specs
		Object.keys(resource.operations).filter(o => !allOperations.includes(o)).forEach(o => {
			const op = resource.operations[o]
			if (op.relationship) {

				let specRel = templates.spec_relationship.split('\n').join('\n\t')

				specRel = specRel.replace(/##__OPERATION_NAME__##/g, op.name)
				specRel = specRel.replace(/##__RELATIONSHIP_TYPE__##/g, op.relationship.type)
				spec = spec.replace(/##__RELATIONSHIP_SPECS__##/g, '\n\n\t' + specRel + '\n\t##__RELATIONSHIP_SPECS__##')

			}
		})
	}


	if (CONFIG.TRIGGER_FUNCTIONS) {
		// Generate triggers operations specs
		const compUpdKey = Object.keys(resource.components).find(c => c.endsWith('Update'))
		if (compUpdKey) {
			const compUpd = resource.components[compUpdKey]
			const triggers = Object.values(compUpd.attributes).filter(a => a.name.startsWith('_'))
			if (triggers.length > 0) {
				const tplt = templates.spec_trigger.split('\n').join('\n\t')
				for (const trigger of triggers) {
					const triggerValue = (trigger.type === 'boolean') ? 'true' : `randomValue('${trigger.type}')`
					const triggerParams = (trigger.type === 'boolean') ? 'id' : 'id, triggerValue'
					let specTrg = tplt
					specTrg = specTrg.replace(/##__OPERATION_NAME__##/g, trigger.name)
					specTrg = specTrg.replace(/##__TRIGGER_VALUE__##/g, triggerValue)
					specTrg = specTrg.replace(/##__TRIGGER_PARAMS__##/g, triggerParams)
					spec = spec.replace(/##__TRIGGER_SPECS__##/g, '\n\n\t' + specTrg + '\n\t##__TRIGGER_SPECS__##')
				}
			}
		}
	}


	// Header
	spec = copyrightHeader(spec)

	spec = spec.replace(/##__RESOURCE_CLASS__##/g, name)
	spec = spec.replace(/##__RESOURCE_TYPE__##/g, type)
	spec = spec.replace(/##__RESOURCE_PATH__##/g, singleton? Inflector.singularize(type) : type)
	// Clear unused placeholders
	spec = spec.replace(/##__RELATIONSHIP_SPECS__##/g, '')
	spec = spec.replace(/##__TRIGGER_SPECS__##/g, '')

	if (resource.operations.create) {

		let obj = '{\n'

		// Attriburtes
		const reqType = resource.operations.create.requestType
		const attributes = reqType ? resource.components[reqType].attributes : {}
		const required = Object.values(attributes).filter(attr => attr.required)
		// required.forEach(r => obj += `\t\t\t${r.name}: ${inspect(randomValue(r.type, r.name))},\n`)
		required.forEach(r => obj += `\t\t\t${r.name}: randomValue('${r.type}', '${r.name}'),\n`)

		// Relationships
		const relationships = reqType ? resource.components[reqType].relationships : {}
		const filtered = Object.values(relationships).filter(rel => !rel.deprecated)
		filtered.forEach(f => {
			let relVal: string | string[] = `clp.${f.type}.relationship(TestData.id)`
			if (f.cardinality === 'to_many') relVal = `[ ${relVal} ]`
			obj += `\t\t\t${f.name}: ${relVal},\n`
		})

		obj += '\t\t}\n'

		spec = spec.replace(/##__RESOURCE_ATTRIBUTES_CREATE__##/g, obj)

	}

	const modelName = String(Object.keys(resource.components)[0].replace(/(Create|Update)$/g, ''))
	spec = spec.replace(/##__RESOURCE_MODEL__##/g, modelName)


	return spec

}


const copyrightHeader = (template: string): string => {

	// Header
	const now = new Date()
	const year = String(now.getFullYear())
	const date = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${year}`
	template = template.replace(/##__CURRENT_YEAR__##/g, year)
	template = template.replace(/##__CURRENT_DATE__##/g, date)
	if (global.version) template = template.replace(/##__SCHEMA_VERSION__##/g, global.version)

	return template

}


const triggerFunctions = (type: string, name: string, resource: Resource, operations: string[]): void => {

	const resName = name
	const compSuffix = 'Update'

	const compUpdKey = Object.keys(resource.components).find(c => c.endsWith(compSuffix))
	if (compUpdKey) {
		const compUpd = resource.components[compUpdKey]
		const triggers = Object.values(compUpd.attributes).filter(a => a.name.startsWith('_'))
		if (triggers.length > 0) {
			const tplt = templates.trigger
			for (const trigger of triggers) {

				const resId = `${Inflector.underscore(type)}Id`
				const op: Operation = {
					type,
					path: `/${type}/{${resId}}`,
					name: trigger.name,
					singleton: false,
					requestType: compUpdKey,
					responseType: compUpdKey.replace(compSuffix, ''),
					id: resId,
					trigger: true
				}

				const placeholders: Record<string, string> = {}
				if (trigger.type !== 'boolean') placeholders.trigger_value = fixAttributeType({ name: '', type: trigger.type, fetchable: true, required: false, enum: [] })

				const tpltOp = templatedOperation(resName, trigger.name, op, tplt, placeholders)
				operations.push(tpltOp.operation)

			}
		}
	}

}


const generateResource = (type: string, name: string, resource: Resource): string => {

	let res = templates.resource
	const operations: string[] = []

	const resName = name

	const resModelInterface = Inflector.singularize(resName)
	let resModelType = 'ApiResource'

	const declaredTypes: Set<string> = new Set([resModelInterface])
	const declaredTypesDef: string[] = []
	// const declaredEnums: ComponentEnums = {}
	const declaredImportsModels: Set<string> = new Set()
	const declaredImportsCommon: Set<string> = new Set(['ResourceId'])


	// Header
	res = copyrightHeader(res)


	// Operations
	const qryMod = new Set<string>()	// Query models (Retrieve/List)
	const resMod = new Set<string>()	// Resource generic models (Es. ResponseList)
	// const relMod = new Set<string>()	// Relationships models
	Object.entries(resource.operations).forEach(([opName, op]) => {
		const tpl = op.singleton ? ((opName === 'update') ? templates['singleton_update'] : templates['singleton']) : templates[opName]
		if (op.singleton) resModelType = 'ApiSingleton'
		if (tpl) {
			if (['create', 'update'].includes(opName)) qryMod.add('QueryParamsRetrieve')
			if (['retrieve', 'list'].includes(opName)) {
				/* do nothing:
					 retrieve operation is common to all resoucres
					 list operation is common to all non singleton resoucres
				*/
			}
			else {
				const tplOp = templatedOperation(resName, opName, op, tpl)
				operations.push(tplOp.operation)
				tplOp.types.forEach(t => declaredTypes.add(t))
			}
		}
		else {
			if (op.relationship && CONFIG.RELATIONSHIP_FUNCTIONS) {
				const tplr = templates[`relationship_${op.relationship.cardinality.replace('to_', '')}`]
				const tplrOp = templatedOperation(resName, opName, op, tplr)
				if (op.relationship.cardinality === Cardinality.to_one) qryMod.add('QueryParamsRetrieve')
				else
					if (op.relationship.cardinality === Cardinality.to_many) {
						qryMod.add('QueryParamsList')
						resMod.add('ListResponse')
					}
				operations.push(tplrOp.operation)
				tplrOp.types.forEach(t => {
					// relMod.add(t)	// Add releationship type
					declaredImportsModels.add(t)	// Add import type
				})
			}
			else
				if (op.action && CONFIG.ACTION_FUNCTIONS) {
					const tpla = templates['action']
					const tplaOp = templatedOperation(resName, opName, op, tpla)
					operations.push(tplaOp.operation)
					tplaOp.typesDef.forEach(t => { declaredTypesDef.push(t) })
				}
				else console.log('Unknown operation: ' + opName)
		}
	})


	const singletonResource = (resModelType === 'ApiSingleton')

	// Trigger functions (only boolean)
	if (CONFIG.TRIGGER_FUNCTIONS) triggerFunctions(type, resName, resource, operations)


	if (operations && (operations.length > 0)) declaredImportsCommon.add('ResourcesConfig')

	res = res.replace(/##__RESOURCE_MODEL_TYPE__##/g, resModelType)
	res = res.replace(/##__RESPONSE_MODELS__##/g, (resMod.size > 0) ? `, ${Array.from(resMod).join(', ')}` : '')
	res = res.replace(/##__MODEL_RESOURCE_INTERFACE__##/g, resModelInterface)
	res = res.replace(/##__IMPORT_RESOURCE_COMMON__##/, Array.from(declaredImportsCommon).join(', '))
	res = res.replace(/##__MODEL_SORTABLE_INTERFACE__##/, singletonResource? '' : `, ${resModelInterface}Sort`)

	const importQueryModels = (qryMod.size > 0) ? `import type { ${Array.from(qryMod).sort().reverse().join(', ')} } from '../query'` : ''
	res = res.replace(/##__IMPORT_QUERY_MODELS__##/, importQueryModels)


	// Resource definition
	res = res.replace(/##__RESOURCE_TYPE__##/g, type)
	res = res.replace(/##__RESOURCE_CLASS__##/g, resName)

	const resourceOperations = (operations && (operations.length > 0)) ? operations.join('\n\n\t') : ''
	res = res.replace(/##__RESOURCE_OPERATIONS__##/, resourceOperations)


	// Interfaces export
	const typesArray = Array.from(declaredTypes)
	res = res.replace(/##__EXPORT_RESOURCE_TYPES__##/g, typesArray.join(', '))
	const typesDefArray = Array.from(declaredTypesDef)
	res = res.replace(/##__EXPORT_RESOURCE_TYPES_DEF__##/g, (typesDefArray.length > 0) ? `${typesDefArray.join('\n')}\n` : '')

	// Interfaces and types definition
	const modelInterfaces: string[] = []
	const resourceInterfaces: string[] = []
	const relationshipTypes: Set<string> = new Set()
	const sortableFields: string[] = []
	const filterableFields: string[] = []
	let nullables = false

	typesArray.forEach(t => {
		const cudSuffix = getCUDSuffix(t)
		const resIntf = ((singletonResource && (cudSuffix === 'Update'))? 'Singleton' : 'Resource') + cudSuffix
		resourceInterfaces.push(resIntf)
		const component: Component = resource.components[t]
		const tplCmp = templatedComponent(resName, t, component, singletonResource)
		tplCmp.models.forEach(m => {
			if (m !== 'Resource') declaredImportsModels.add(m)	// Fix resource_errors issue
		})
		modelInterfaces.push(tplCmp.component)
		if (cudSuffix) tplCmp.models.forEach(t => relationshipTypes.add(t))
		else {
			sortableFields.push('id', ...Object.values(component.attributes).filter(f => (f.sortable && !RESOURCE_COMMON_FIELDS.includes(f.name))).map(f => f.name))
			filterableFields.push('id', ...Object.values(component.attributes).filter(f => (f.filterable && !RESOURCE_COMMON_FIELDS.includes(f.name))).map(f => f.name))
		}
		nullables ||= tplCmp.nullables
	})
	res = res.replace(/##__MODEL_INTERFACES__##/g, modelInterfaces.join('\n\n\n'))
	res = res.replace(/##__IMPORT_RESOURCE_INTERFACES__##/g, resourceInterfaces.join(', '))

	res = res.replace(/##__MODEL_SORTABLE_FIELDS__##/g, sortableFields.map(f => { return `'${f}'` }).join(' | '))
	res = res.replace(/##__MODEL_FILTERABLE_FIELDS__##/g, filterableFields.map(f => { return `'${f}'` }).join(' | '))


	// Relationships definition
	const relTypesArray = Array.from(relationshipTypes).map(i => `type ${i}Rel = ResourceRel & { type: ${i}Type }`)
	res = res.replace(/##__RELATIONSHIP_TYPES__##/g, relTypesArray.length ? (relTypesArray.join('\n') + '\n') : '')

	// Resources import
	const impResMod: string[] = Array.from(declaredImportsModels)
		.filter(i => !typesArray.includes(i))	// excludes resource self reference
		.map(i => {
			const fileRel = Inflector.underscore(Inflector.pluralize(i))
			return `import type { ${i}${relationshipTypes.has(i) ? `, ${i}Type` : ''} } from './${fileRel}'`
		})
	const importStr = impResMod.join('\n') + (impResMod.length ? '\n' : '')
	res = res.replace(/##__IMPORT_RESOURCE_MODELS__##/g, importStr)

	// Singleton path override
	res = res.replace(/##__SINGLETON_PATH_OVERRIDE__##/, singletonResource ? `\n\tpath(): string {\n\t\treturn '${Inflector.singularize(type)}'\n\t}\n` : '')

	// Enum types definitions

	// Nullable type import
	if (!nullables) res = res.replace(/import type { Nullable/, '// import type { Nullable')


	return res

}


const payloadDataType = (properties: any): any => {
	const fields = Object.entries(properties).filter(([p, v]) => (p !== 'attributes')).map(([p, v]: [string, any]) => {
		let type = v.type
		if ((type === 'string') && v.enum && (v.enum.length > 0)) type = v.enum.map(t => { return `'${t}'` }).join(' | ')
		return `${p}: ${type}`
	}).join(', ')
	const attributes = Object.entries(properties.attributes.properties).map(([k, v]: [string, any]) => `${k}${v.nullable ? '?' : ''}: ${v.type}`).join(', ')

	return `{ ${fields}, ${attributes} }`

}


const templatedOperation = (res: string, name: string, op: Operation, tpl: string, placeholders?: Record<string, string>): { operation: string, types: string[], typesDef: string[] } => {

	let operation = tpl
	const types: string[] = []
	const typesDef: string[] = []

	operation = operation.replace(/##__OPERATION_NAME__##/g, name)
	operation = operation.replace(/##__RESOURCE_CLASS__##/g, res)

	if (op.requestType) {
		const requestType = op.requestType
		operation = operation.replace(/##__RESOURCE_REQUEST_CLASS__##/g, requestType)
		if (isObjectType(requestType)) {
			const typeDef = `export type ${Inflector.camelize(op.name)}DataType = ${payloadDataType(op.requestTypeDef)}`
			typesDef.push(typeDef)
		}
		else if (!types.includes(requestType)) types.push(requestType)
	}
	if (op.responseType) {
		const responseType = op.responseType
		operation = operation.replace(/##__RESOURCE_RESPONSE_CLASS__##/g, responseType)
		if (!types.includes(responseType)) types.push(responseType)
	}

	const opIdVar = op.id ? Inflector.camelize(op.id, true) : ''
	if (op.relationship) {	// Relationship
		operation = operation.replace(/##__RELATIONSHIP_TYPE__##/g, op.relationship.type)
		operation = operation.replace(/##__RELATIONSHIP_PATH__##/g, op.path.substring(1).replace('{' + op.id, '${_' + opIdVar))
		operation = operation.replace(/##__RESOURCE_ID__##/g, opIdVar)
		operation = operation.replace(/##__MODEL_RESOURCE_INTERFACE__##/g, Inflector.singularize(res))
	}
	else
		if (op.trigger) {	// Trigger
			operation = operation.replace(/##__RESOURCE_ID__##/g, opIdVar)
			operation = operation.replace(/##__MODEL_RESOURCE_INTERFACE__##/g, Inflector.singularize(res))
			operation = operation.replace(/##__TRIGGER_VALUE__##/, placeholders?.trigger_value ? ` triggerValue: ${placeholders.trigger_value},` : '')
			operation = operation.replace(/##__TRIGGER_VALUE_TYPE__##/, placeholders?.trigger_value ? 'triggerValue' : 'true')
		}
		else
			if (op.action) {	// Action
				operation = operation.replace(/##__ACTION_PATH__##/g, op.path.substring(1).replace('{' + op.id, '${_' + opIdVar))
				operation = operation.replace(/##__RESOURCE_ID__##/g, opIdVar)
				operation = operation.replace(/##__MODEL_RESOURCE_INTERFACE__##/g, Inflector.singularize(res))
				operation = operation.replace(/##__ACTION_PAYLOAD_PARAM__##/g, isObjectType(op.requestType) ? ` payload: ${Inflector.camelize(op.name)}DataType,` : '')
				operation = operation.replace(/##__ACTION_PAYLOAD__##/g, isObjectType(op.requestType) ? ' ...payload ' : '')
				operation = operation.replace(/##__ACTION_COMMAND__##/g, op.type.toUpperCase())
			}

	if (placeholders) Object.entries(placeholders).forEach(([key, val]) => {
		const plh = (key.startsWith('##__') && key.endsWith('__##')) ? key : `##__${key.toUpperCase()}__##`
		operation = operation.replace(key, val)
	})

	operation = operation.replace(/\n/g, '\n\t')


	return { operation, types, typesDef }

}


const fixAttributeType = (attr: Attribute): string => {
	if (attr.enum?.length > 0) return `${attr.enum.map(a => `'${a}'`).join(' | ')}`
	else
		switch (attr.type) {
			case 'integer': return 'number'
			case 'object': return 'Record<string, any>'
			case 'object[]': return 'Array<Record<string, any>>'
			default: return attr.type
		}
}


const getCUDSuffix = (name: string): string => {
	const suffixes = ['Create', 'Update', 'Delete']
	let suffix = ''
	if (name) {
		suffixes.some(x => {
			if (name.endsWith(x)) {
				suffix = x
				return true
			}
			return false
		})
	}
	return suffix
}

const isCUDModel = (name: string): boolean => {
	return (name !== undefined) && (getCUDSuffix(name) !== '')
}


const nullable = (type: string): string => {
	return `Nullable<${type}>`
}


type ComponentEnums = { [key: string]: string }

const templatedComponent = (res: string, name: string, cmp: Component, singleton?: boolean): { component: string, models: string[], enums: ComponentEnums, nullables: boolean } => {

	const cudModel = isCUDModel(name)

	const models: string[] = []
	const enums: ComponentEnums = {}

	// Attributes
	const attributes = Object.values(cmp.attributes)
	const fields: string[] = []
	let nullables = false
	attributes.forEach(a => {
		if (!RESOURCE_COMMON_FIELDS.includes(a.name)) {
			if (cudModel || a.fetchable) {
				let attrType = fixAttributeType(a)
				if (a.enum) enums[a.name] = attrType
				if (a.description || a.example) {
					const desc = (a.description && !a.description.endsWith('.')) ? `${a.description}.` : a.description
					fields.push(`/** ${desc ? `\n\t * ${desc}` : ''}${a.example ? `\n\t * @example \`\`\`${(typeof a.example === 'object') ? JSON.stringify(a.example) : `"${a.example}"`}\`\`\`` : ''}\n\t */`)
				}
				fields.push(`${a.name}${a.required ? '' : '?'}: ${a.required ? attrType : nullable(attrType)}`)
				nullables ||= (!a.required && !RESOURCE_COMMON_FIELDS.includes(a.name))
			}
		}
	})

	// Specific resource type
	if (!cudModel) fields.unshift(`readonly type: ${name}Type\n`)

	// Relationships
	const relationships = Object.values(cmp.relationships)
	const rels: string[] = []
	relationships.forEach(r => {
		if (r.deprecated) {
			const deprecated = '/**\n\t* @deprecated This field should not be used as it may be removed in the future without notice\n\t*/\n\t'
			rels.push(`${deprecated}${r.name}?: object${(r.cardinality === Cardinality.to_many) ? '[]' : ''}`)
		}
		else {

			let resName = r.type

			if (resName !== 'object') {
				const relStr = cudModel ? 'Rel' : ''
				if (r.polymorphic && r.oneOf) {
					resName = r.oneOf.map(o => `${o}${relStr}`).join(' | ')
					models.push(...r.oneOf)
				}
				else {
					resName = Inflector.camelize(Inflector.singularize(r.type))
					models.push(resName)
					resName += relStr
				}
			}

			if ((r.cardinality === Cardinality.to_many)) {
				if (r.polymorphic) resName = `Array<${resName}>`
				else resName += '[]'
			}

			rels.push(`${r.name}${r.required ? '' : '?'}: ${r.required ? resName : nullable(resName)}`)
			nullables ||= !r.required

		}
	})


	let component = (fields.length || rels.length) ? templates.model : templates.model_empty

	component = component.replace(/##__RESOURCE_MODEL__##/g, name)

	const cudSuffix = getCUDSuffix(name)
	const extendType = ((singleton && cudModel && (cudSuffix === 'Update'))? 'Singleton' : 'Resource') + cudSuffix
	component = component.replace(/##__EXTEND_TYPE__##/, extendType)

	const fieldsStr = (fields.length ? '\n\t' : '') + fields.join('\n\t') + (fields.length && rels.length ? '\n' : '')
	const relsStr = rels.join('\n\t') + (rels.length ? '\n' : '')
	component = component.replace(/##__RESOURCE_MODEL_FIELDS__##/g, fieldsStr)
	component = component.replace(/##__RESOURCE_MODEL_RELATIONSHIPS__##/g, relsStr)


	return { component, models, enums, nullables }

}



generate(process.argv.indexOf('--local') > -1)
