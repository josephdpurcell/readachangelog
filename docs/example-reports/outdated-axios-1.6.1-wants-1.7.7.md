```
Explanation:

package.json has:
    "axios": "^1.6.1",
Version installed is 1.6.1
Latest is 1.7.1
You ran readachangelog outdated and this report would be generated
```

# Table of Contents

- [axios](#axios): 1.6.1 --> 1.7.7 (Latest 1.7.7)

<a id="axios"></a>

# axios

**Homepage:** https://axios-http.com

**Current:** 1.6.1

**Wanted:** 1.7.7

**Latest:** 1.7.7

## [1.7.7](https://github.com/axios/axios/compare/v1.7.6...v1.7.7) (2024-08-31)

### Bug Fixes

* **fetch:** fix stream handling in Safari by fallback to using a stream reader instead of an async iterator; ([#6584](https://github.com/axios/axios/issues/6584)) ([d198085](https://github.com/axios/axios/commit/d1980854fee1765cd02fa0787adf5d6e34dd9dcf))
* **http:** fixed support for IPv6 literal strings in url ([#5731](https://github.com/axios/axios/issues/5731)) ([364993f](https://github.com/axios/axios/commit/364993f0d8bc6e0e06f76b8a35d2d0a35cab054c))

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/10539109?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Rishi556](https://github.com/Rishi556 "+39/-1 (#5731 )")
- <img src="https://avatars.githubusercontent.com/u/12586868?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Dmitriy Mozgovoy](https://github.com/DigitalBrainJS "+27/-7 (#6584 )")

## [1.7.6](https://github.com/axios/axios/compare/v1.7.5...v1.7.6) (2024-08-30)

### Bug Fixes

* **fetch:** fix content length calculation for FormData payload; ([#6524](https://github.com/axios/axios/issues/6524)) ([085f568](https://github.com/axios/axios/commit/085f56861a83e9ac02c140ad9d68dac540dfeeaa))
* **fetch:** optimize signals composing logic; ([#6582](https://github.com/axios/axios/issues/6582)) ([df9889b](https://github.com/axios/axios/commit/df9889b83c2cc37e9e6189675a73ab70c60f031f))

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/12586868?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Dmitriy Mozgovoy](https://github.com/DigitalBrainJS "+98/-46 (#6582 )")
- <img src="https://avatars.githubusercontent.com/u/3534453?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Jacques Germishuys](https://github.com/jacquesg "+5/-1 (#6524 )")
- <img src="https://avatars.githubusercontent.com/u/53894505?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [kuroino721](https://github.com/kuroino721 "+3/-1 (#6575 )")

## [1.7.5](https://github.com/axios/axios/compare/v1.7.4...v1.7.5) (2024-08-23)

### Bug Fixes

* **adapter:** fix undefined reference to hasBrowserEnv ([#6572](https://github.com/axios/axios/issues/6572)) ([7004707](https://github.com/axios/axios/commit/7004707c4180b416341863bd86913fe4fc2f1df1))
* **core:** add the missed implementation of AxiosError#status property; ([#6573](https://github.com/axios/axios/issues/6573)) ([6700a8a](https://github.com/axios/axios/commit/6700a8adac06942205f6a7a21421ecb36c4e0852))
* **core:** fix `ReferenceError: navigator is not defined` for custom environments; ([#6567](https://github.com/axios/axios/issues/6567)) ([fed1a4b](https://github.com/axios/axios/commit/fed1a4b2d78ed4a588c84e09d32749ed01dc2794))
* **fetch:** fix credentials handling in Cloudflare workers ([#6533](https://github.com/axios/axios/issues/6533)) ([550d885](https://github.com/axios/axios/commit/550d885eb90fd156add7b93bbdc54d30d2f9a98d))

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/12586868?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Dmitriy Mozgovoy](https://github.com/DigitalBrainJS "+187/-83 (#6573 #6567 #6566 #6564 #6563 #6557 #6556 #6555 #6554 #6552 )")
- <img src="https://avatars.githubusercontent.com/u/2495809?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Antonin Bas](https://github.com/antoninbas "+6/-6 (#6572 )")
- <img src="https://avatars.githubusercontent.com/u/5406212?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Hans Otto Wirtz](https://github.com/hansottowirtz "+4/-1 (#6533 )")

## [1.7.4](https://github.com/axios/axios/compare/v1.7.3...v1.7.4) (2024-08-13)

### Bug Fixes

* **sec:** CVE-2024-39338 ([#6539](https://github.com/axios/axios/issues/6539)) ([#6543](https://github.com/axios/axios/issues/6543)) ([6b6b605](https://github.com/axios/axios/commit/6b6b605eaf73852fb2dae033f1e786155959de3a))
* **sec:** disregard protocol-relative URL to remediate SSRF ([#6539](https://github.com/axios/axios/issues/6539)) ([07a661a](https://github.com/axios/axios/commit/07a661a2a6b9092c4aa640dcc7f724ec5e65bdda))

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/31389480?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Lev Pachmanov](https://github.com/levpachmanov "+47/-11 (#6543 )")
- <img src="https://avatars.githubusercontent.com/u/41283691?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Đỗ Trọng Hải](https://github.com/hainenber "+49/-4 (#6539 )")

## [1.7.3](https://github.com/axios/axios/compare/v1.7.2...v1.7.3) (2024-08-01)

### Bug Fixes

* **adapter:** fix progress event emitting; ([#6518](https://github.com/axios/axios/issues/6518)) ([e3c76fc](https://github.com/axios/axios/commit/e3c76fc9bdd03aa4d98afaf211df943e2031453f))
* **fetch:** fix withCredentials request config ([#6505](https://github.com/axios/axios/issues/6505)) ([85d4d0e](https://github.com/axios/axios/commit/85d4d0ea0aae91082f04e303dec46510d1b4e787))
* **xhr:** return original config on errors from XHR adapter ([#6515](https://github.com/axios/axios/issues/6515)) ([8966ee7](https://github.com/axios/axios/commit/8966ee7ea62ecbd6cfb39a905939bcdab5cf6388))

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/12586868?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Dmitriy Mozgovoy](https://github.com/DigitalBrainJS "+211/-159 (#6518 #6519 )")
- <img src="https://avatars.githubusercontent.com/u/10867286?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Valerii Sidorenko](https://github.com/ValeraS "+3/-3 (#6515 )")
- <img src="https://avatars.githubusercontent.com/u/8599535?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [prianYu](https://github.com/prianyu "+2/-2 (#6505 )")

## [1.7.2](https://github.com/axios/axios/compare/v1.7.1...v1.7.2) (2024-05-21)

### Bug Fixes

* **fetch:** enhance fetch API detection; ([#6413](https://github.com/axios/axios/issues/6413)) ([4f79aef](https://github.com/axios/axios/commit/4f79aef81b7c4644328365bfc33acf0a9ef595bc))

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/12586868?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Dmitriy Mozgovoy](https://github.com/DigitalBrainJS "+3/-3 (#6413 )")

## [1.7.1](https://github.com/axios/axios/compare/v1.7.0...v1.7.1) (2024-05-20)

### Bug Fixes

* **fetch:** fixed ReferenceError issue when TextEncoder is not available in the environment; ([#6410](https://github.com/axios/axios/issues/6410)) ([733f15f](https://github.com/axios/axios/commit/733f15fe5bd2d67e1fadaee82e7913b70d45dc5e))

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/12586868?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Dmitriy Mozgovoy](https://github.com/DigitalBrainJS "+14/-9 (#6410 )")

## [1.7.0](https://github.com/axios/axios/compare/v1.7.0-beta.2...v1.7.0) (2024-05-19)

### Features

* **adapter:** add fetch adapter; ([#6371](https://github.com/axios/axios/issues/6371)) ([a3ff99b](https://github.com/axios/axios/commit/a3ff99b59d8ec2ab5dd049e68c043617a4072e42))

### Bug Fixes

* **core/axios:** handle un-writable error stack ([#6362](https://github.com/axios/axios/issues/6362)) ([81e0455](https://github.com/axios/axios/commit/81e0455b7b57fbaf2be16a73ebe0e6591cc6d8f9))  

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/12586868?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Dmitriy Mozgovoy](https://github.com/DigitalBrainJS "+1015/-127 (#6371 )")
- <img src="https://avatars.githubusercontent.com/u/4814473?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Jay](https://github.com/jasonsaayman "+30/-14 ()")
- <img src="https://avatars.githubusercontent.com/u/16711696?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Alexandre ABRIOUX](https://github.com/alexandre-abrioux "+56/-6 (#6362 )")

## [1.6.8](https://github.com/axios/axios/compare/v1.6.7...v1.6.8) (2024-03-15)

### Bug Fixes

* **AxiosHeaders:** fix AxiosHeaders conversion to an object during config merging ([#6243](https://github.com/axios/axios/issues/6243)) ([2656612](https://github.com/axios/axios/commit/2656612bc10fe2757e9832b708ed773ab340b5cb))
* **import:** use named export for EventEmitter; ([7320430](https://github.com/axios/axios/commit/7320430aef2e1ba2b89488a0eaf42681165498b1))
* **vulnerability:** update follow-redirects to 1.15.6 ([#6300](https://github.com/axios/axios/issues/6300)) ([8786e0f](https://github.com/axios/axios/commit/8786e0ff55a8c68d4ca989801ad26df924042e27))

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/4814473?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Jay](https://github.com/jasonsaayman "+4572/-3446 (#6238 )")
- <img src="https://avatars.githubusercontent.com/u/12586868?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Dmitriy Mozgovoy](https://github.com/DigitalBrainJS "+30/-0 (#6231 )")
- <img src="https://avatars.githubusercontent.com/u/68230846?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Mitchell](https://github.com/Creaous "+9/-9 (#6300 )")
- <img src="https://avatars.githubusercontent.com/u/53797821?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Emmanuel](https://github.com/mannoeu "+2/-2 (#6196 )")
- <img src="https://avatars.githubusercontent.com/u/44109284?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Lucas Keller](https://github.com/ljkeller "+3/-0 (#6194 )")
- <img src="https://avatars.githubusercontent.com/u/72791488?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Aditya Mogili](https://github.com/ADITYA-176 "+1/-1 ()")
- <img src="https://avatars.githubusercontent.com/u/46135319?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Miroslav Petrov](https://github.com/petrovmiroslav "+1/-1 (#6243 )")

## [1.6.7](https://github.com/axios/axios/compare/v1.6.6...v1.6.7) (2024-01-25)

### Bug Fixes

* capture async stack only for rejections with native error objects; ([#6203](https://github.com/axios/axios/issues/6203)) ([1a08f90](https://github.com/axios/axios/commit/1a08f90f402336e4d00e9ee82f211c6adb1640b0))

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/12586868?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Dmitriy Mozgovoy](https://github.com/DigitalBrainJS "+30/-26 (#6203 )")
- <img src="https://avatars.githubusercontent.com/u/73059627?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [zhoulixiang](https://github.com/zh-lx "+0/-3 (#6186 )")

## [1.6.6](https://github.com/axios/axios/compare/v1.6.5...v1.6.6) (2024-01-24)

### Bug Fixes

* fixed missed dispatchBeforeRedirect argument ([#5778](https://github.com/axios/axios/issues/5778)) ([a1938ff](https://github.com/axios/axios/commit/a1938ff073fcb0f89011f001dfbc1fa1dc995e39))
* wrap errors to improve async stack trace ([#5987](https://github.com/axios/axios/issues/5987)) ([123f354](https://github.com/axios/axios/commit/123f354b920f154a209ea99f76b7b2ef3d9ebbab))

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/1186084?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Ilya Priven](https://github.com/ikonst "+91/-8 (#5987 )")
- <img src="https://avatars.githubusercontent.com/u/1884246?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Zao Soula](https://github.com/zaosoula "+6/-6 (#5778 )")

## [1.6.5](https://github.com/axios/axios/compare/v1.6.4...v1.6.5) (2024-01-05)

### Bug Fixes

* **ci:** refactor notify action as a job of publish action; ([#6176](https://github.com/axios/axios/issues/6176)) ([0736f95](https://github.com/axios/axios/commit/0736f95ce8776366dc9ca569f49ba505feb6373c))
* **dns:** fixed lookup error handling; ([#6175](https://github.com/axios/axios/issues/6175)) ([f4f2b03](https://github.com/axios/axios/commit/f4f2b039dd38eb4829e8583caede4ed6d2dd59be))

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/12586868?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Dmitriy Mozgovoy](https://github.com/DigitalBrainJS "+41/-6 (#6176 #6175 )")
- <img src="https://avatars.githubusercontent.com/u/4814473?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Jay](https://github.com/jasonsaayman "+6/-1 ()")

## [1.6.4](https://github.com/axios/axios/compare/v1.6.3...v1.6.4) (2024-01-03)

### Bug Fixes

* **security:** fixed formToJSON prototype pollution vulnerability; ([#6167](https://github.com/axios/axios/issues/6167)) ([3c0c11c](https://github.com/axios/axios/commit/3c0c11cade045c4412c242b5727308cff9897a0e))
* **security:** fixed security vulnerability in follow-redirects ([#6163](https://github.com/axios/axios/issues/6163)) ([75af1cd](https://github.com/axios/axios/commit/75af1cdff5b3a6ca3766d3d3afbc3115bb0811b8))

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/4814473?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Jay](https://github.com/jasonsaayman "+34/-6 ()")
- <img src="https://avatars.githubusercontent.com/u/12586868?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Dmitriy Mozgovoy](https://github.com/DigitalBrainJS "+34/-3 (#6172 #6167 )")
- <img src="https://avatars.githubusercontent.com/u/1402060?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Guy Nesher](https://github.com/gnesher "+10/-10 (#6163 )")

## [1.6.3](https://github.com/axios/axios/compare/v1.6.2...v1.6.3) (2023-12-26)

### Bug Fixes

* Regular Expression Denial of Service (ReDoS) ([#6132](https://github.com/axios/axios/issues/6132)) ([5e7ad38](https://github.com/axios/axios/commit/5e7ad38fb0f819fceb19fb2ee5d5d38f56aa837d))

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/4814473?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Jay](https://github.com/jasonsaayman "+15/-6 (#6145 )")
- <img src="https://avatars.githubusercontent.com/u/22686401?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Willian Agostini](https://github.com/WillianAgostini "+17/-2 (#6132 )")
- <img src="https://avatars.githubusercontent.com/u/12586868?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Dmitriy Mozgovoy](https://github.com/DigitalBrainJS "+3/-0 (#6084 )")

## [1.6.2](https://github.com/axios/axios/compare/v1.6.1...v1.6.2) (2023-11-14)

### Features

* **withXSRFToken:** added withXSRFToken option as a workaround to achieve the old `withCredentials` behavior; ([#6046](https://github.com/axios/axios/issues/6046)) ([cff9967](https://github.com/axios/axios/commit/cff996779b272a5e94c2b52f5503ccf668bc42dc))

### PRs
- feat(withXSRFToken): added withXSRFToken option as a workaround to achieve the old &#x60;withCredentials&#x60; behavior; ( [#6046](https://api.github.com/repos/axios/axios/pulls/6046) )
```

📢 This PR added &#x27;withXSRFToken&#x27; option as a replacement for old withCredentials behaviour. 
You should now use withXSRFToken along with withCredential to get the old behavior.
This functionality is considered as a fix.
```

### Contributors to this release

- <img src="https://avatars.githubusercontent.com/u/12586868?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Dmitriy Mozgovoy](https://github.com/DigitalBrainJS "+271/-146 (#6081 #6080 #6079 #6078 #6046 #6064 #6063 )")
- <img src="https://avatars.githubusercontent.com/u/79681367?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Ng Choon Khon (CK)](https://github.com/ckng0221 "+4/-4 (#6073 )")
- <img src="https://avatars.githubusercontent.com/u/9162827?v&#x3D;4&amp;s&#x3D;18" alt="avatar" width="18"/> [Muhammad Noman](https://github.com/mnomanmemon "+2/-2 (#6048 )")
