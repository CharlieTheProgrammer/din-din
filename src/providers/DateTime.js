import * as DateTime from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';

DateTime.extend(weekOfYear);
DateTime.extend(utc);

export { DateTime };
