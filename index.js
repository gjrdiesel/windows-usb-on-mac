const {usb,log} = require('./setup');

const filterBlanks = d=>d!='';

// steps:
// diskutil list
// disktuil eraseDisk MS-DOS "WINDOWS10" MBR disk#
// hdiutil mount ISO.iso
// instead of CP below (which is what i did and it worked great)
// could use rsync and use that to build the progress bar
// see below:
// cp -rpv /Volumes/${VOLUME_GIVEN_IN_COMMAND_BEFORE}/* /Volumes/WINDOWS10/

// rsync -avzh --progress --stats root@server:/path/to/file output_name
// https://askubuntu.com/questions/609303/how-can-i-view-a-progress-bar-when-running-rsync

function filterDisks(list){
	return list.split("/dev/disk")
	.filter(filterBlanks)
	.map(disk=>{
		
		let info = disk
		.split("\n")[2]
		.split(" ")
		.filter(filterBlanks);

		size = info.slice((info.length-3),info.length-1).join('');
		label = info.slice((info.length-1),info.length)[0];
		external = disk.split("\n")[0].includes("(external, physical)");

		return {
			label,
			size,			
			external,
		}
	});
}

usb(async cmd => {
	let disks = filterDisks(await cmd('diskutil list'));
	console.log(disks);

	const DIR_NAME = '.';
	let numberOfFiles = await cmd(`find ${DIR_NAME} -type f | wc -l`);
	console.log(`numberOfFiles: ${numberOfFiles}`);

	log(`du ~/`,(output,error,code)=>{
		if(output){
			console.log(output);
		}
		process.exit();
	});

});