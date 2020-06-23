import moment from 'moment';
import _ from 'lodash';

export function mapEvent(eventArr: any[]) {
    console.log("refreshing", eventArr);
    return _.chain(eventArr)
      .groupBy(function (obj) { return Math.floor(+(obj.start) / (1000 * 60 * 15)); })
      .sortBy(function (v, k) { return k; })
      .map(o => { return { events: o, start: o[0].start, end: moment(o[0].start).add(15, "minute").toDate(), title: '' } })
      .value();
  }