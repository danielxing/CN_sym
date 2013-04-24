PresentationKit-Binaries
========================

The binary version of PresentationKit.

Current Version: 0.9.8

Revision History
================

0.9.8:
- Changed brandsButton outlet to brandsButtons IBOutletCollection to accommodate multiple brands buttons (#947). Note that brandsButton is still available but
  is now deprecated, please switch to the brandsButtons outlet.

0.9.7:
- Fixed HCP removal from PKEvents

0.9.6:
- Added 2 new menu options for setting the color and highlight style of thumbnails in the menu, ThumbnailMapSelectedColor and highlightStyle.
- Removed ability to add custom properties to PK model objects. Now you must use -valueForKey and -setValue:forKey: in order to add custom values.

0.9.5:
- Fixed fonts not always working correctly
- Fixed issue with missing event on slide modal popup
- Reworked the way paths our stored so that we only keep relative paths from the root of the application (Required uninstall/reinstall of the app)
- Fixed issue where sometimes the app would not save data due to an issue with slides defined inside the presentation bundle

0.9.4:
- SystemBridge is now automatically included for all slide action scripts that use it. (#720)
- Added optional breadcrumbContainerView outlet to autoresize breadcrumb adjacent controls and background imagery as breadcrumb map scales (#719)
- Changed breadcrumb IBOutlet to breadcrumbView. Note that this must also be of type PKBreadcrumbView now. (#719)
- Added all default navigation layer art assets into an internal bundle for use when no other navigation layer is provided with a presentation
- Changed PKPresentationViewControllerDelegate. Now you must implement -presentationViewControllerDidRequestExit: and you have optional delegate methods
  for providing an exit view controller that is presented as a popup from the exit button and/or an exit confirmation view controller which is presented
  as a popup in the middle of the view.
- Fixed issue with previous slide content flashing when jumping to a new slide
- Briefcase button only shows when briefcase items are available

0.9.3:
- Removed the background from popups. This must now be handled by the CSS.
- Eliminated "tug" when swiping slides quickly in a presentation.
- Improved error messages surrounding package installation.
- Model Changes:
  - PKPackage:
    - Removed "parent" -> "requiredPackages" one-to-many relationship, replaced with "referencingPackages" -> "requiredPackages" many-to-many.
    - Removed "rootPackage" property, replaced with "rootPackages" set property.
  - PKBrand:
    - Removed "packages" relationship, replaced with "presentations"
    - Added static find* methods to locate brands by ID.

0.9.2:
- Added menuLocationReferenceView property to PKNavigationView

0.9.1:
- Made PKNavigationView.h public (for use in wiring up XIBs)
- Model changes related to PKBrand

0.9.0:
- Initial release.
