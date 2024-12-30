import { redirect } from 'react-router-dom';
import axiosInstance from '../../../configs/axios';
import { clearAuthData } from '../../../utils';

export async function action({ request }) {
  try {
    await axiosInstance.request({
      url: '/v1/auth/sign-out',
      method: request.method
    });

    clearAuthData();

    return redirect('/sign-in');
  } catch (err) {
    clearAuthData();
    return err.response.data;
  }
}
