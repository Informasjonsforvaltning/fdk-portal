export function findByTestId(wrapper, testId) {
  const selector = `[data_test="${testId}"]`;
  return wrapper.find(selector);
}

export function insertTestId(testId) {
  return { data_test: testId };
}

export const testIds = {
  boxRegular: {
    component: 'box-regular-component'
  }
};
