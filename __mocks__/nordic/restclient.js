const mockGet = jest.fn();

const mockedRestclitent = jest.fn().mockImplementation(() => ({
    get: mockGet
}));

module.exports = mockedRestclitent;
module.exports.mockGet = mockGet;
