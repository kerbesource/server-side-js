import { CronJob } from 'cron';
import * as uuid from 'uuid';

interface CronJobs {
    [id: string]: any;
}

class CronService {
    private jobs: CronJobs = {};

    public add(pattern: string, callback: any): string {
        const id = uuid.v4();
        this.jobs[id] = new CronJob(pattern, callback);
        this.jobs[id].start();
        return id;
    }

    public remove(id: string) {
        this.jobs[id].stop();
        delete(this.jobs[id]);
    }
}

const Cron = new CronService();

export { Cron };