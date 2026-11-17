import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import UIKit

class SceneDelegate: RCTDefaultReactNativeFactoryDelegate, UIWindowSceneDelegate {
  var window: UIWindow?
  var reactNativeFactory: RCTReactNativeFactory?

  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard let windowScene = scene as? UIWindowScene else {
      return
    }

    dependencyProvider = RCTAppDependencyProvider()
    reactNativeFactory = RCTReactNativeFactory(delegate: self)
    window = UIWindow(windowScene: windowScene)
    let launchBackground = UIColor(red: 12 / 255.0, green: 21 / 255.0, blue: 37 / 255.0, alpha: 1)
    window?.backgroundColor = launchBackground
    
    #if DEBUG
    let devMenuConfiguration = RCTDevMenuConfiguration(
      devMenuEnabled: true,
      shakeGestureEnabled: true,
      keyboardShortcutsEnabled: true
    )
    reactNativeFactory?.devMenuConfiguration = devMenuConfiguration
    #endif
    
    reactNativeFactory?.startReactNative(
      withModuleName: "EpiMobility",
      in: window,
      connectionOptions: connectionOptions
    )
    window?.rootViewController?.view.backgroundColor = launchBackground
    if let rootView = window?.rootViewController?.view as? RCTSurfaceHostingProxyRootView {
      let loadingView = UIView(frame: rootView.bounds)
      loadingView.backgroundColor = launchBackground
      let icon = UIImageView(image: UIImage(named: "LaunchIcon"))
      icon.contentMode = .scaleAspectFit
      icon.translatesAutoresizingMaskIntoConstraints = false
      loadingView.addSubview(icon)
      NSLayoutConstraint.activate([
        icon.centerXAnchor.constraint(equalTo: loadingView.centerXAnchor),
        icon.centerYAnchor.constraint(equalTo: loadingView.centerYAnchor),
        icon.widthAnchor.constraint(equalToConstant: 160),
        icon.heightAnchor.constraint(equalToConstant: 160)
      ])
      rootView.loadingViewFadeDelay = 0
      rootView.loadingViewFadeDuration = 0.2
      rootView.loadingView = loadingView
    }
  }

  func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    RCTLinkingManager.scene(scene, openURLContexts: URLContexts)
  }

  func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
    RCTLinkingManager.scene(scene, continue: userActivity)
  }

  override func bundleURL() -> URL? {
    #if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}
