import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import TableCell from './table-cell';

let wrapper: ReactWrapper = null;

describe(`<TableCell />`, () => {
  beforeEach(() => {
    wrapper = mount(
      <table>
        <tbody>
          <tr>
            <TableCell>
              <p />
            </TableCell>
          </tr>
        </tbody>
      </table>
    );
  });

  it(`Handles props.children`, () => {
    expect(wrapper.find(`td`).html()).toBe(
      `<td class="${NAMESPACE}-td"><p></p></td>`
    );

    wrapper.unmount();

    wrapper = mount(
      <table>
        <tbody>
          <tr>
            <TableCell>
              <strong />
            </TableCell>
          </tr>
        </tbody>
      </table>
    );
    expect(wrapper.find(`td`).html()).toBe(
      `<td class="${NAMESPACE}-td"><strong></strong></td>`
    );
  });

  it(`Handles props.className`, () => {
    expect(
      wrapper
        .find(`td`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-td`);

    wrapper.unmount();

    wrapper = mount(
      <table>
        <tbody>
          <tr>
            <TableCell className="foo">
              <p />
            </TableCell>
          </tr>
        </tbody>
      </table>
    );
    expect(
      wrapper
        .find(`td`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-td foo`);

    wrapper.unmount();

    wrapper = mount(
      <table>
        <tbody>
          <tr>
            <TableCell className="foo bar">
              <p />
            </TableCell>
          </tr>
        </tbody>
      </table>
    );
    expect(
      wrapper
        .find(`td`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-td foo bar`);
  });

  it(`Handles props.style`, () => {
    expect(
      wrapper
        .find(`td`)
        .getDOMNode()
        .getAttribute(`style`)
    ).toBe(null);

    wrapper.unmount();

    wrapper = mount(
      <table>
        <tbody>
          <tr>
            <TableCell style={{ zIndex: 1 }}>
              <p />
            </TableCell>
          </tr>
        </tbody>
      </table>
    );
    expect(
      wrapper
        .find(`td`)
        .getDOMNode()
        .getAttribute(`style`)
    ).toBe(`z-index: 1;`);

    wrapper = mount(
      <table>
        <tbody>
          <tr>
            <TableCell style={{ zIndex: 1, opacity: 0 }}>
              <p />
            </TableCell>
          </tr>
        </tbody>
      </table>
    );
    expect(
      wrapper
        .find(`td`)
        .getDOMNode()
        .getAttribute(`style`)
    ).toBe(`z-index: 1; opacity: 0;`);
  });

  it(`Handles props.tag`, () => {
    expect(wrapper.find(`td`).html()).toBe(
      `<td class="${NAMESPACE}-td"><p></p></td>`
    );

    wrapper.unmount();

    wrapper = mount(
      <table>
        <tbody>
          <tr>
            <TableCell tag="th">
              <p />
            </TableCell>
          </tr>
        </tbody>
      </table>
    );
    expect(wrapper.find(`th`).html()).toBe(
      `<th class="${NAMESPACE}-th"><p></p></th>`
    );

    wrapper.unmount();

    wrapper = mount(
      <table>
        <tbody>
          <tr>
            <TableCell tag="td">
              <p />
            </TableCell>
          </tr>
        </tbody>
      </table>
    );
    expect(wrapper.find(`td`).html()).toBe(
      `<td class="${NAMESPACE}-td"><p></p></td>`
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });
});