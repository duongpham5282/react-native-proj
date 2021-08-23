const dev = {
  apiGateway: {
    url: 'https://dev.api.hutbot.pizzahut.io/admin-proxy',
    refreshToken: 'https://dev.admin.hutbot.pizzahut.io/refresh-token?redirectTo=',
    logout:
      'https://qafedsso.yum.com/pkmslogout?appurl=https%3A%2F%2Fhutbot.auth.eu-west-1.amazoncognito.com%2Flogout%3Fclient_id%3D2su05l5h95rk0hal2sc9d7ubi8%26logout_uri%3Dhttps%3A%2F%2Fdev.admin.hutbot.pizzahut.io%2Flogin',
  },
};

const localQa = {
  apiGateway: {
    url: 'http://localhost:3000/admin-proxy',
    refreshToken: '/refresh-token?redirectTo=',
    logout:
      'https://qafedsso.yum.com/pkmslogout?appurl=http%3A%2F%2Flocalhost%3A3000%2Flogout%3Fclient_id%3D5k9alh5urpt4sa76qv6u3illkf%26logout_uri%3Dhttps%3A%2F%2Fqa.admin.hutbot.pizzahut.io%2Flogin',
  },
};

const qa = {
  apiGateway: {
    url: 'https://qa.api.hutbot.pizzahut.io/admin-proxy',
    refreshToken: 'https://qa.admin.hutbot.pizzahut.io/refresh-token?redirectTo=',
    logout:
      'https://qafedsso.yum.com/pkmslogout?appurl=https%3A%2F%2Fqa.auth.hutbot.pizzahut.io%2Flogout%3Fclient_id%3D5k9alh5urpt4sa76qv6u3illkf%26logout_uri%3Dhttps%3A%2F%2Fqa.admin.hutbot.pizzahut.io%2Flogin',
  },
};

const staging = {
  apiGateway: {
    url: 'https://staging.api.hutbot.pizzahut.io/admin-proxy',
    refreshToken: 'https://staging.admin.hutbot.pizzahut.io/refresh-token?redirectTo=',
    logout:
      'https://qafedsso.yum.com/pkmslogout?appurl=https%3A%2F%2Fstaging.auth.hutbot.pizzahut.io%2Flogout%3Fclient_id%3D5k9alh5urpt4sa76qv6u3illkf%26logout_uri%3Dhttps%3A%2F%2Fstaging.admin.hutbot.pizzahut.io%2Flogin',
  },
};

const prod = {
  apiGateway: {
    url: 'https://api.hutbot.pizzahut.io/admin-proxy',
    refreshToken: 'https://admin.hutbot.pizzahut.io/refresh-token?redirectTo=',
    logout:
      'https://fedsso.yum.com/pkmslogout?appurl=https%3A%2F%2Fauth.hutbot.pizzahut.io%2Flogout%3Fclient_id%3D1af5fq82f1908ncchm8ot4ubqt%26logout_uri%3Dhttps%3A%2F%2Fadmin.hutbot.pizzahut.io%2Flogin',
  },
};

const CONFIG = {
  localQa,
  dev,
  qa,
  staging,
  prod,
};

const reactAppStage = process.env.REACT_APP_STAGE || 'localQa';
const config = appStage => CONFIG[appStage];

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config(reactAppStage),
  environment: reactAppStage,
};
