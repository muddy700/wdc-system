import { constants } from '../config/constants';
import { Agenda } from 'agenda';
// import { createSalesWeeklyPerformanceReport } from '../modules/performance/performance.service'

const mongoConnectionString = `${constants.DATABASE_URL}`;
const agenda = new Agenda({ db: { address: mongoConnectionString } });
agenda.processEvery('1 second');

const enum JOB_TYPES {
  WEEKLY_PERFORMANCE_REPORT = 'weeklyPerformanceReport',
}

agenda.define(JOB_TYPES.WEEKLY_PERFORMANCE_REPORT, async () => {
  // await createSalesWeeklyPerformanceReport()
});

export async function runJob() {
  await agenda.start();
  agenda.every('0 0 * * SUN', JOB_TYPES.WEEKLY_PERFORMANCE_REPORT);
}
(async function () {
  runJob();
}
)();
