import { urls } from '../config/urls';
import { IGenreResponse } from '../interfaces';
import { AxiosRes, axiosService } from './axios.service';

export const genresService = {
  getAll: (): AxiosRes<IGenreResponse> =>
    axiosService.get(urls.genre).then((response) => response),
};
