import {fireEvent, render} from '@testing-library/react';

it('OnLOad', () => {
  const {queryByLabelText, getByLabelText} = render(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />,
  );

});
