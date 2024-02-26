// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  live_url: 'https://fcmdev.thestorywallcafe.com',
  // live_url:'https://fcmtest.thestorywallcafe.com',
  //live_url:'http://localhost:8005',
  lead_list:'/api/lead-list/',
  lead_status:'/api/lead-list-status/',
  lead_subStatus:'/api/lead-list-substatus/',
  lead_season:'/api/season/',
  lead_priority:'/api/priority/',
  lead_campaign:'/api/campaign-lead-list/',
  lead_course:'/api/course-leadlist/',
  lead_upload:'/api/upload-lead-data/',
  lead_refer:'/api/refer-lead-counsellor/',
  lead_note:'/api/note/',
  _user:'/api/user/',
  lead_email:'/api/send-emails/',
  raw_data:'/api/upload-lead-data/',
  lead_ids:`/api/get-lead-ids/`,
  whatsapp_template:`/api/template/`,
  lead_follow_up:`/api/follow-up/`,
  export_leads:`/api/export-leads/`,
  leadPayment:`/api/send-payment-link/`,
  paymentDetails:`/api/payment-details/`,
  leadStage:`/api/lead-stage/`,
  admission_details:`/api/admission-details/`,
  followUps:`/api/follow-up/`,
  payment_status:`/api/payment-status/`
};
