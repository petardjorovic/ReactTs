import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject
    );
  });
}

export const fetchAddress =
  createAsyncThunk<AddressPayload>(
    'user/fetchAddress',
    async function () {
      // 1) We get the user's geolocation position
      const positionObj = await getPosition();
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
      const addressObj =
        await getAddress(position);
      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

      // 3) Then we return an object with the data that we are interested in

      // Payload of the fulfilled state
      return { position, address };
    }
  );

type InitState = {
  username: string;
  status: 'idle' | 'loading' | 'error';
  position: null | {
    latitude: number;
    longitude: number;
  };
  address: string;
  error: string;
};

type AddressPayload = {
  position: {
    latitude: number;
    longitude: number;
  };
  address: string;
};

const initialState: InitState = {
  username: '',
  status: 'idle',
  position: null,
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName: (
      state,
      action: PayloadAction<string>
    ) => {
      // payload = username;
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchAddress.fulfilled,
        (
          state,
          action: PayloadAction<AddressPayload>
        ) => {
          state.status = 'idle';
          state.position =
            action.payload.position;
          state.address = action.payload.address;
        }
      )
      .addCase(fetchAddress.rejected, (state) => {
        state.status = 'error';
        state.error =
          'There was a problem getting your address. Make sure to fill this field!';
      });
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
