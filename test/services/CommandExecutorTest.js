'use es6';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import CommandExecutor from '../../src/services/CommandExecutor';

chai.use(chaiAsPromised);
chai.use(sinonChai);


const expect = chai.expect;

describe('Command executor', () => {
  const commandExecutor = new CommandExecutor();
  let identify;
  let tableCreation;

  describe('without throwing', () => {
    before(() => {
      identify = sinon.stub(commandExecutor.identifier, 'identify').returns('foo');
      tableCreation = sinon.stub(commandExecutor.tableCreator, 'create').returns('bar');
    });

    after(() => {
      identify.restore();
      tableCreation.restore();
    });

    it('executes without error', () => {
      expect(commandExecutor.execute(['a', 'b', 'c'], 'd')).to.become('bar');
    });
  });


  describe('does throw', () => {
    before(() => {
      identify = sinon.stub(commandExecutor.identifier, 'identify').returns('foo');
      tableCreation = sinon.stub(commandExecutor.tableCreator, 'create').throws(new Error('foo bar'));
    });

    after(() => {
      identify.restore();
      tableCreation.restore();
    });

    it('executes without error', () => {
      const statusIdentifiers = ['a', 'b', 'c'];
      expect(commandExecutor.execute(statusIdentifiers, 'd')).to.become(`Unable to find HTTP statuses for: ${statusIdentifiers} due to error: foo bar`);
    });
  });
});
