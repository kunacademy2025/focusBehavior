
import { DefaultApiService } from "@/services/api-services/defaultApiService";
import { ServiceName } from "@/services/api-services/servicesNames";
import TrainingScheduleModel from "./model";

export const TrainingScheduleApis = new DefaultApiService<TrainingScheduleModel>(ServiceName.TRAINING_SCHEDULES);
