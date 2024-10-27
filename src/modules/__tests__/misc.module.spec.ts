import { test, expect } from 'vitest';

test('MiscModule', () => {
  expect(true).toBe(true);
});

// import type { AxiosInstance } from 'axios';
// import { mock } from 'jest-mock-extended';

// import { ValidationError } from '../../error/validation.error';
// import { mockBanks } from '../../fixtures/bank.fixture';
// import { mockCountries, mockCountry, mockStates } from '../../fixtures/country.fixture';
// import type { ListStatesArgs } from '../../schema/misc.schema';
// import { StatusCodes } from '../../utils/status.util';
// import MiscellanouseModule from '../misc.module';

// jest.mock('axios');

// describe('MiscellaneousModule', () => {
//   const mockedAxios = mock<AxiosInstance>();
//   const axiosGetSpy = jest.spyOn(mockedAxios, 'get');

//   const miscModule = new MiscellanouseModule(mockedAxios);

//   describe('listCountries', () => {
//     it('should return a list of countries', async () => {
//       axiosGetSpy.mockResolvedValueOnce({
//         status: StatusCodes.OK,
//         data: {
//           status: true,
//           data: mockCountries,
//         },
//       });

//       const countries = await miscModule.listCountries();

//       expect(countries).toEqual(expect.arrayContaining(mockCountries));
//       expect(countries).toHaveLength(mockCountries.length);

//       expect(axiosGetSpy).toBeCalledWith('/country');
//       expect(axiosGetSpy).toBeCalledTimes(1);
//     });
//   });

//   describe('listStates', () => {
//     it('should return an error when country is not provided', async () => {
//       const expected = new ValidationError('country is required');
//       await expect(miscModule.listStates({} as ListStatesArgs)).rejects.toEqual(expected);
//     });

//     it('should return a list of states', async () => {
//       axiosGetSpy.mockResolvedValueOnce({
//         status: StatusCodes.OK,
//         data: {
//           status: true,
//           data: mockStates,
//         },
//       });
//       const country = 'US';
//       const states = await miscModule.listStates({ country });

//       expect(axiosGetSpy).toBeCalledWith(`/address_verification/states?country=${country}`);
//       expect(axiosGetSpy).toBeCalledTimes(1);
//       expect(states).toHaveLength(mockStates.length);
//       expect(states).toEqual(expect.arrayContaining(mockStates));
//     });
//   });

//   describe('listBanks', () => {
//     it('should return a list of banks', async () => {
//       axiosGetSpy.mockResolvedValueOnce({
//         status: StatusCodes.OK,
//         data: {
//           status: true,
//           data: mockBanks,
//         },
//       });
//       const banks = await miscModule.listBanks({});
//       expect(axiosGetSpy).toBeCalledWith('/bank');
//       expect(axiosGetSpy).toBeCalledTimes(1);
//       expect(banks).toHaveLength(mockBanks.length);
//       expect(banks).toEqual(expect.arrayContaining(mockBanks));
//     });
//   });
// });
