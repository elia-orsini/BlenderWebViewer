# BlenderWebViewer
a Web Viewer for Blender.

**To get started**:
- Clone the repo
- Install the add-on for Blender (`blenderPlugin.zip`)
- `cd` into the `viewer` folder and run `npm install`
- in the same folder, run `npm run start` to start the server
- change the path in the blender add-on to your `viewer` folder
- click `export` in the blender add-on
- visit the page `localhost:3000` to view your blender scene in your browser
#

When you move objects around the plugin is going to hot-reload the page but if you add new elements you might have to refresh the page manually.

It currently does not support Area lights.


