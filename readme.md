# Windows USB on Mac

If you are looking to format a USB for Windows while on a Mac, then this just the script for you. Well, soon it will be. I'm building it out and then later I plan on turning into a GUI interface because I hate struggling to do this on a mac and I always end up wasting a bunch of time. I don't understand why some of the more popular programs don't already include this but oh well, this is my moment!

The steps are actually pretty simple if you are friendly with the command line, this script will automate it and the GUI will use the same thing under the hood. Here are the steps if you'd rather do it yourself:

```
diskutil list
disktuil eraseDisk MS-DOS "WINDOWS10" MBR disk# (REPLACE # with YOUR DISK #)
hdiutil mount {PATH_TO_YOUR_ISO_HERE}.iso
cp -rpv /Volumes/${VOLUME_GIVEN_IN_COMMAND_BEFORE}/* /Volumes/WINDOWS10/
```

If that seems to complicated, then do these steps to install this CLI script:

## CLI Installation

```
git clone https://github.com/gjrdiesel/windows-usb-on-mac.git
npm install && node index.js
```

Follow the steps on screen and enjoy your new windows setup!