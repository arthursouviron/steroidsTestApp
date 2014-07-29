# For an explanation of the steroids.config properties, see the guide at
# http://guides.appgyver.com/steroids/guides/project_configuration/config-application-coffee/

steroids.config.name = "mobile"

# -- Initial Location --
steroids.config.location = "http://localhost/views/devise/sign_in.html"
#steroids.config.location = "http://localhost/views/contacts/index.html"

# -- DRAWERS
steroids.config.drawers =
  left:
    id: "drawer"
    location: "http://localhost/views/drawer/index.html"
    showOnAppLoad: false
    widthOfDrawerInPixels: 250
  options:
    centerViewInteractionMode: "Full"
    closeGestures: ["PanNavBar", "PanCenterView", "TapCenterView"]
    openGestures: ["PanNavBar", "PanCenterView"]
    showShadow: true
    stretchDrawer: true
    widthOfLayerInPixels: 0


steroids.config.preloads = [
  {
    id: "login"
    location: "http://localhost/views/devise/sign_in.html"
  }
  {
    id: "settings"
    location: "http://localhost/views/settings/index.html"
  }
  {
    id: "contacts"
    location: "http://localhost/views/contacts/index.html"
  }
  {
    id: "logout"
    location: "http://localhost/views/devise/sign_out.html"
  }
  {
    id: "signup"
    location: "http://localhost/views/devise/sign_up.html"
  }
  {
    id: "new_contact"
    location: "http://localhost/views/contacts/new.html"
  }
  {
    id: "map"
    location: "http://localhost/views/map/index.html"

  }
]



# -- Tab Bar --
# steroids.config.tabBar.enabled = true
# steroids.config.tabBar.tabs = [
#   {
#     title: "Contacts"
#     icon: "icons/pill@2x.png"
#     location: "http://localhost/views/contacts/index.html"
#   },
#   {
#     title: "Map"
#     icon: "icons/telescope@2x.png"
#     location: "http://localhost/views/map/index.html"
#   }
# ]

# steroids.config.tabBar.tintColor = "#000000"
# steroids.config.tabBar.tabTitleColor = "#00aeef"
# steroids.config.tabBar.selectedTabTintColor = "#ffffff"
#steroids.config.tabBar.selectedTabBackgroundImage = "icons/pill@2x.png"

# steroids.config.tabBar.backgroundImage = ""

# -- Navigation Bar --
steroids.config.navigationBar.tintColor = "#145fd7"
steroids.config.navigationBar.titleColor = "#ffffff"
steroids.config.navigationBar.buttonTintColor = "#ffffff"

# steroids.config.navigationBar.landscape.backgroundImage = ""
# steroids.config.navigationBar.portrait.backgroundImage = ""

# -- Android Loading Screen
steroids.config.loadingScreen.tintColor = "#FFFFFF"

# -- iOS Status Bar --
steroids.config.statusBar.enabled = true
steroids.config.statusBar.style = "default"

# -- File Watcher --
# steroids.config.watch.exclude = ["www/my_excluded_file.js", "www/my_excluded_dir"]

# -- Pre- and Post-Make hooks --
# steroids.config.hooks.preMake.cmd = "echo"
# steroids.config.hooks.preMake.args = ["running yeoman"]
# steroids.config.hooks.postMake.cmd = "echo"
# steroids.config.hooks.postMake.args = ["cleaning up files"]

# -- Default Editor --
# steroids.config.editor.cmd = "subl"
# steroids.config.editor.args = ["."]
