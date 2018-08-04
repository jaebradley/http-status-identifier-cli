import * as httpStatusIdentifier from 'http-status-identifier';
import identifyStatuses from './identifyStatuses';

jest.mock('http-status-identifier');

describe('#identifyStatuses', () => {
  const identifyStatusMock = jest.spyOn(httpStatusIdentifier, 'identifyStatus');

  const status = 'status';
  const lowerCaseStatusIdentifier = 'lowerCaseStatusIdentifier';
  const lowerCaseStatusIdentifiers = [lowerCaseStatusIdentifier];
  const upperCaseStatusIdentifier = 'UPPERCASESTATUSIDENTIFIER';
  const upperCaseStatusIdentifiers = [upperCaseStatusIdentifier];

  const lowerCaseFamilyStatusIdentifier = 'informational';
  const upperCaseFamilyStatusIdentifier = 'INFORMATIONAL';
  const lowerCaseNumericalFamilyStatusIdentifier = '1xx';
  const upperCaseNumericalFamilyStatusIdentifier = '1XX';

  afterEach(() => {
    identifyStatusMock.mockClear();
  });

  it('should identify lower-case status', () => {
    identifyStatusMock.mockImplementation(() => status);
    expect(identifyStatuses(lowerCaseStatusIdentifiers)).toEqual([status]);
    expect(identifyStatusMock).toHaveBeenCalledTimes(1);
    expect(identifyStatusMock).toHaveBeenCalledWith(lowerCaseStatusIdentifier.toUpperCase());
  });

  it('should identify upper-case status', () => {
    identifyStatusMock.mockImplementation(() => status);
    expect(identifyStatuses(upperCaseStatusIdentifiers)).toEqual([status]);
    expect(identifyStatusMock).toHaveBeenCalledTimes(1);
    expect(identifyStatusMock).toHaveBeenCalledWith(upperCaseStatusIdentifier);
  });

  it('should identify lower-case, non-numerical family', () => {
    identifyStatusMock.mockImplementation(() => { throw new Error('Unable to identify status'); });
    expect(identifyStatuses([lowerCaseFamilyStatusIdentifier]))
      .toEqual(httpStatusIdentifier.HttpStatusFamily.INFORMATIONAL.statuses);
    expect(identifyStatusMock).toHaveBeenCalledTimes(1);
    expect(identifyStatusMock).toHaveBeenCalledWith(lowerCaseFamilyStatusIdentifier.toUpperCase());
  });

  it('should identify upper-case, non-numerical family', () => {
    identifyStatusMock.mockImplementation(() => { throw new Error('Unable to identify status'); });
    expect(identifyStatuses([upperCaseFamilyStatusIdentifier]))
      .toEqual(httpStatusIdentifier.HttpStatusFamily.INFORMATIONAL.statuses);
    expect(identifyStatusMock).toHaveBeenCalledTimes(1);
    expect(identifyStatusMock).toHaveBeenCalledWith(upperCaseFamilyStatusIdentifier);
  });

  it('should identify lower-case, numerical family', () => {
    identifyStatusMock.mockImplementation(() => { throw new Error('Unable to identify status'); });
    expect(identifyStatuses([lowerCaseNumericalFamilyStatusIdentifier]))
      .toEqual(httpStatusIdentifier.HttpStatusFamily.INFORMATIONAL.statuses);
    expect(identifyStatusMock).toHaveBeenCalledTimes(1);
    expect(identifyStatusMock)
      .toHaveBeenCalledWith(lowerCaseNumericalFamilyStatusIdentifier.toUpperCase());
  });

  it('should identify upper-case, numerical family', () => {
    identifyStatusMock.mockImplementation(() => { throw new Error('Unable to identify status'); });
    expect(identifyStatuses([upperCaseNumericalFamilyStatusIdentifier]))
      .toEqual(httpStatusIdentifier.HttpStatusFamily.INFORMATIONAL.statuses);
    expect(identifyStatusMock).toHaveBeenCalledTimes(1);
    expect(identifyStatusMock)
      .toHaveBeenCalledWith(upperCaseNumericalFamilyStatusIdentifier);
  });

  it('should not identify value that is not a status nor family', () => {
    identifyStatusMock.mockImplementation(() => { throw new Error('Unable to identify status'); });
    expect(identifyStatuses(['foo']))
      .toEqual([]);
    expect(identifyStatusMock).toHaveBeenCalledTimes(1);
    expect(identifyStatusMock)
      .toHaveBeenCalledWith('FOO');
  });
});
