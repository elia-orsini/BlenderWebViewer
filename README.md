# BlenderWebViewer
a Web Viewer for Blender.

![gif](https://media.giphy.com/media/hJGhtiQyOLK4ZJCfCb/giphy.gif)

**To get started**:
- Clone the repo
- Install the add-on for Blender (`blenderPlugin.zip`)
- change the path field in the blender add-on to the cloned folder (ie. *Users/elia/Documents/BlenderWebViewer*)
- run the following command from the BlenderWebViewer folder to install all the dependencies: <br />
`yarn run dependencies`
- from the same folder, run `yarn start` to start the server
- click `export` in the blender add-on
- visit the page `localhost:3000` to view your blender scene in your browser
#

When you move objects around the plugin is going to hot-reload the page but if you add new elements you might have to refresh the page manually.

It currently does not support Area lights.

#

to do list:

- find a way to export/import ambient lights / HDRIs
- add animations to the web viewer
- convert area lights from blender to three.js
