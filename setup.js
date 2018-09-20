const cp = require('child-process-es6-promise');
const {spawn} = require('child_process');

function line2args(line){
	line = line.split(' ');
	let cmd = line[0];
	let args = line.slice(1);
	return {cmd,args};
}

async function usb_cmd(line){
	let {cmd,args} = line2args(line);
	return (await cp.spawn(cmd,args,{shell:true})).stdout
}

async function checkForRequiredPrograms(){
	await usb_cmd('which diskutil');
	await usb_cmd('which hdiutil');
	await usb_cmd('which cp');
}

function missingPrograms(error){
	console.log('')
	console.log(error);
	console.log('')
	console.log('diskutil, hdiutil, and cp are all required for this program to work properly, aborting...');
}

function errorReporting(error){
	console.log('');
	console.log(error);
	console.log('Whoops something went really wrong, sorry!');
	console.log('');
	console.log('Please copy and paste this entire error go to a new github issue here:');
	console.log('https://github.com/gjrdiesel/windows-usb-on-mac/issues/new');
	console.log('')
};

function usb(fn){
	return checkForRequiredPrograms().then(()=>{
		fn(usb_cmd).catch(errorReporting);
	}).catch(missingPrograms);
}

function log(line,fn){
	const {cmd,args} = line2args(line);
	const p = spawn(cmd,args,{shell:true});
	p.stdout.on('data',data=>fn(data.toString(),null,null));
	p.stderr.on('data',data=>fn(null,data.toString(),null));
	p.on('close',code=>fn(null,null,code));
}

module.exports = {
	usb,
	log
};