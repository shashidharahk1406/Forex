import { DataService } from "../service/data.service";

export class FilterFollowUp {
   dataService:any=new DataService()
  updateUrlParameter(url: any, key: any, newValue: any) {
    const urlObj = new URL(url);
    if(newValue == 'All'){
      const searchParams = urlObj.searchParams;
      searchParams.delete('follow_up_status');
    }
    else{
      if (urlObj.searchParams.has(key)) {
        urlObj.searchParams.set(key, newValue);
      } else {
        // Key doesn't exist, add it
        urlObj.searchParams.append(key, newValue);
      }
    }
    return urlObj.toString();
    
  }

  getSearch(value: any) {
    var apistring: any = '';
    apistring += `key=${value}`;

    const data: any = {
      key: 'key',
      value: value,
    };

    return data;
  }

  getFilterBYForm(key: any, value: any) {
    var apistring: any = '';

    switch (value) {
      case 'counselled_by':
        apistring += `counselled_by=${value}`;
        break;

      case 'counsellor_id':
        apistring += `Counsellor_id=${value}`;
        break;

      case 'follow_up_status':
        apistring += `follow_up_status=${value}`;
        break;

      case 'course':
        apistring += `course=${value}`;
        break;

      case 'source_id':
        apistring += `source_id=${value}`;
        break;

      case 'stream_id':
        apistring += `stream_id=${value}`;
        break;

      case 'city_id':
        apistring += `city_id=${value}`;
        break;

      default:
        // Your logic for the default case
        break;
    }
  }

  getSortDataBYForm(key: any, value: any) {
    var apistring: any = '';

    switch (value) {
      case 'Ascending':
        apistring += `&filter_by=${value}`;
        break;

      case 'Descending':
        apistring += `&filter_by=${value}`;
        break;

      case 'Creation Date':
        apistring += `&filter_by=${value}`;
        break;

      case 'Modification Date':
        apistring += `&filter_by=${value}`;
        break;

      case 'Next Action Date':
        apistring += `&filter_by=${value}`;
        break;

      default:
        // Your logic for the default case
        break;
    }

    const key_value: any = { key: key, apistring: apistring, value: value };

    return key_value;
  }

  getFilteredDate(value: any) {
    var apistring: any = '';
    apistring += `&action_datetime=${value}`;

    const data: any = {
      key: 'action_datetime',
      value: value,
    };

    return data;
  }

  getFilterFollowup(key: any, value: any, url: any = null): void {
    console.log('ke value in filter class ', key, value);
    var apistring: any = '';
    switch (value) {
      case 'Upcoming':
        apistring += `${key}=${value}`;
        break;

      case 'Done':
        apistring += `${key}=${value}`;
        break;

      case 'Missed':
        apistring += `${key}=${value}`;
        break;

      default:
        break;
    }

    const key_value: any = { key: key, apistring: apistring, value: value };

    return key_value;
  }
}
