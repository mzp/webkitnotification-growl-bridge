webkitNotification-growl bridge
============================================================

OVERVIEW
------------------------------

webkitNotificaiton is very useful, but something dull.
So, I replace it by Growl with bridge server and chrome extenion.

*IMPORTANT: This is very experimental software. Plesae use at your own risk.*

Setup bridge server
------------------------------

    $ cd bridge
    $ bundle install
    $ ruby app.rb

Setup chrome extenion
------------------------------

Use `Preferences` -> `Extensions` -> `Load unpackaged extenions` to load `chrome/` .

After load chrome extension, use can test `webkitNotifications.createNotification("","foo","bar")` at console.

Author
------------------------------

 * @mzp