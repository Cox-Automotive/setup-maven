import * as core from '@actions/core'
import * as toolCache from '@actions/tool-cache'
import * as path from 'path'
import * as os from 'os'

let tempDirectory = process.env['RUNNER_TEMPDIRECTORY'] || ''

core.info(`Starting Maven-setup`)

// Sets rootDir for windows, MacOS, or linux
if (!tempDirectory) {
  let rootDir: string
  if (os.platform() === 'win32') {
    rootDir = process.env['USERPROFILE'] || 'C:\\'
  } else if (os.platform() === 'darwin') {
    rootDir = '/Users'
  } else {
    // Assume linux
    rootDir = '/home'
  }
  tempDirectory = path.join(rootDir, 'actions', 'temp')
}

export async function getMaven(version: string): Promise<void> {
  if (!version.match('^\\d+(\\.\\d+){0,2}$'))
    throw new Error('invalid version input')

  if (isEmpty(version)) version = '3.0.5'

  core.info(`Installing Maven ${version}`)

  await downloadMaven(version)
  let toolPath = toolCache.find('maven', version)
  toolPath = path.join(toolPath, 'bin')
  core.addPath(toolPath)
}

async function downloadMaven(version: string): Promise<string> {
  const toolDirectoryName = `apache-maven-${version}`

  const downloadURL = `https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/${version}/${toolDirectoryName}-bin.tar.gz`
  core.info(`downloadURL: ${downloadURL}`)

  try {
    const downloadPath = await toolCache.downloadTool(downloadURL)
    core.info(`downloadPath: ${downloadPath}`)
    const extractedPath = await toolCache.extractTar(downloadPath)
    core.info(`extractedPath: ${extractedPath}`)
    const toolRoot = path.join(extractedPath, toolDirectoryName)
    core.info(`toolRoot: ${toolRoot}`)
    return await toolCache.cacheDir(toolRoot, 'maven', version)
  } catch (error) {
    throw error
  }
}

function isEmpty(str: string): boolean {
  return !str || str.length === 0
}

async function run(): Promise<void> {
  try {
    const version = core.getInput('maven-version')
    if (version) await getMaven(version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
