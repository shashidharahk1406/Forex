// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  live_url: 'https://fcmdev.thestorywallcafe.com',
  //live_url:'https://fcmtest.thestorywallcafe.com',
  //live_url:'http://localhost:8005',
  //live_url:'https://admin.firstclassmentor.com',
  lead_list:'https://fcmdev.thestorywallcafe.com/api/lead-list/',
  lead_status:'https://fcmdev.thestorywallcafe.com/api/lead-list-status/',
  lead_subStatus:'https://fcmdev.thestorywallcafe.com/api/lead-list-substatus/',
  lead_season:'https://fcmdev.thestorywallcafe.com/api/season/',
  lead_priority:'https://fcmdev.thestorywallcafe.com/api/priority/',
  lead_campaign:'https://fcmdev.thestorywallcafe.com/api/campaign-lead-list/',
  lead_course:'https://fcmdev.thestorywallcafe.com/api/course-leadlist/',
  lead_upload:'https://fcmdev.thestorywallcafe.com/api/upload-lead-data/',
  lead_refer:'https://fcmdev.thestorywallcafe.com/api/refer-lead-counsellor/',
  lead_note:'https://fcmdev.thestorywallcafe.com/api/note/',
  _user:'https://fcmdev.thestorywallcafe.com/api/user/',
  lead_email:'https://fcmdev.thestorywallcafe.com/api/send-emails/',
  raw_data:'https://fcmdev.thestorywallcafe.com/api/upload-lead-data/',
  lead_ids:`https://fcmdev.thestorywallcafe.com/api/get-lead-ids/`,
  whatsapp_template:`https://fcmdev.thestorywallcafe.com/api/template/`,
  lead_follow_up:`https://fcmdev.thestorywallcafe.com/api/follow-up/`,
  export_leads:`https://fcmdev.thestorywallcafe.com/api/export-leads/`,
  leadPayment:`https://fcmdev.thestorywallcafe.com/api/send-payment-link/`,
  paymentDetails:`https://fcmdev.thestorywallcafe.com/api/payment-details/`,
  leadStage:`https://fcmdev.thestorywallcafe.com/api/lead-stage/`,
  admission_details:`https://fcmdev.thestorywallcafe.com/api/admission-details/`,
  followUps:`https://fcmdev.thestorywallcafe.com/api/follow-up/`,
  payment_status:`https://fcmdev.thestorywallcafe.com/api/payment-status/`,
  studying_stream:`https://fcmdev.thestorywallcafe.com/api/studying-stream/`,
};
