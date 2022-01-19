#!/usr/bin/env deno run --allow-read --allow-write --allow-run --allow-env --unstable

import * as _ from 'https://cdn.skypack.dev/lodash-es@^4.17.15';
// import * as _ from "https://cdn.pika.dev/lodash-es@^4.17.15";
import * as path from 'https://deno.land/std@0.121.0/path/mod.ts';

const LINK_DETECTION_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
const NAME_VERSION_REGEX = () => /([\w-_]+)-(\d+(\.\d+(\.\d+)?)?(-\w+)?)\.pom/gim;
const logText = await Deno.readTextFile('gradle-assemble-log.txt');

const matches = logText.match(LINK_DETECTION_REGEX);
const urls = _.sortBy(_.sortedUniq(matches).map(url => path.basename(url)));
const names: {name:string, version: string}[] = urls.map((basename: string) => {
    const match = NAME_VERSION_REGEX().exec(basename);
    const name = match?.[1] ?? `ERROR-${basename}`;
    const version = match?.[2] ?? "";
    return {name, version}
});
const dependencies:Record<string, string> = {};
names.forEach( ({name, version}) => dependencies[name] = version );

const report = {
    count: urls.length,
    dependencies: dependencies
}
await Deno.writeTextFile('jcenter-dependencies.json', JSON.stringify(report, undefined, 2));
