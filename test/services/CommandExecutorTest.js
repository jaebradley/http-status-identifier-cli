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
  let urlOpener;

  describe('without throwing', () => {
    before(() => {
      identify = sinon.stub(commandExecutor.identifier, 'identify').returns('foo');
      tableCreation = sinon.stub(commandExecutor.tableCreator, 'create').returns('bar');
      urlOpener = sinon.stub(commandExecutor, 'browserPageOpener').returns('baz');
    });

    after(() => {
      identify.restore();
      tableCreation.restore();
      urlOpener.restore();
    });

    it('executes without error', () => {
      expect(commandExecutor.execute(['a', 'b', 'c'], 'd'), false).to.become('bar');
      commandExecutor.execute(['a', 'b', 'c'], 'd', false).then(() => {
        expect(urlOpener.called).to.equal(false);
      });
    });
  });


  describe('does throw', () => {
    before(() => {
      identify = sinon.stub(commandExecutor.identifier, 'identify').returns('foo');
      tableCreation = sinon.stub(commandExecutor.tableCreator, 'create').throws(new Error('foo bar'));
      urlOpener = sinon.stub(commandExecutor, 'browserPageOpener').returns('baz');
    });

    after(() => {
      identify.restore();
      tableCreation.restore();
      urlOpener.restore();
    });

    it('executes without error', () => {
      const statusIdentifiers = ['a', 'b', 'c'];
      expect(commandExecutor.execute(statusIdentifiers, 'd', false)).to.become(`Unable to find HTTP statuses for: ${statusIdentifiers} due to Error: foo bar`);
      commandExecutor.execute(statusIdentifiers, 'd', false).then(() => {
        expect(urlOpener.called).to.equal(false);
      });
    });
  });

  describe('does open', () => {
    before(() => {
      const status = {
        definition: {
          documentationUrl: 'jaebaebae',
        },
      };
      identify = sinon.stub(commandExecutor.identifier, 'identify').returns(status);
      tableCreation = sinon.stub(commandExecutor.tableCreator, 'create').returns('bar');
      urlOpener = sinon.stub(commandExecutor, 'browserPageOpener').returns('baz');
    });

    after(() => {
      identify.restore();
      tableCreation.restore();
      urlOpener.restore();
    });

    it('executes without error', () => {
      expect(commandExecutor.execute([1, 2, 3], 'd', true)).to.become('bar');
      commandExecutor.execute([1, 2, 3], 'd', true).then(() => {
        expect(urlOpener.called).to.equal(true);
      });
    });
  });
});
