module.exports = {
    title: '三一集团法务数字化管理平台-小程序',
    name: 'LEGAL SYSTEM',
    clientId: 'legal', // 客户端id
    clientSecret: 'legal_secret', // 客户端密钥
    tenantMode: false, // 开启租户模式
    captchaMode: true, // 开启验证码模式
    pwa: true,
    navTheme: 'dark', // theme for nav menu
    primaryColor: '#1890FF', // primary color of ant design
    layout: 'sidemenu', // nav menu position: sidemenu or topmenu
    contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
    fixedHeader: true, // sticky header
    autoHideHeader: false, // auto hide header
    fixSiderbar: true, // sticky siderbar
    collapse: true,
    menu: {
        disableLocal: false
    },
    // your iconfont Symbol Scrip Url
    // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
    // 注意：如果需要图标多色，Iconfont图标项目里要进行批量去色处理
    iconfontUrl: '//at.alicdn.com/t/font_2540330_y3s6izbyka.js',
    // 第三方登陆授权地址
    authUrl: '/api/blade-auth/oauth/render',
    // 流程设计器地址
    flowDesignUrl: 'http://localhost:9999',
    resourceURL: {
        uploadURL: '/api/blade-resource/fileUpload',
        uploadPictureURL: '/api/blade-resource/pictureUpload',
        showImgURL: '/api/blade-resource/show',
        downFileURL: '/api/blade-resource/fileDownload',
        appQrCodeURL: '/api/blade-resource/showAppQrCodeImg',
        getAvatarURL(avatar, token) {
            if (avatar == null || avatar === '') {
                return '/BiazfanxmamNRoxxVxka.png';
            }
            return `/api/blade-resource/show?fileId=${avatar}&Blade-Auth=${token}`;
        }
    },
    // 在线预览地址
    onlinePreviewUrl: '/preview/onlinePreview',
    // 是否在安全审查
    isSercureCheck: true
};
