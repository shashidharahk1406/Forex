// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  live_url: 'https://fcmdev.thestorywallcafe.com',
  lead_list:'/api/lead-list/',
  lead_status:'/api/lead-list-status/',
  lead_subStatus:'/api/lead-list-substatus/',
  lead_season:'/api/season/',
  lead_priority:'/api/priority/',
  lead_campaign:'/api/campaign-lead-list/',
  lead_course:'/api/course-leadlist/'
};
