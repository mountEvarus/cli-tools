import { afterEach, beforeAll, describe, expect, it, mock, spyOn } from 'bun:test';
import { Command } from 'commander';

import { addModuleToProgram } from '@/src/module';
import { ModuleMetadata } from '@/src/module/module.type';

describe('addModuleToProgram function tests', () => {
  const mockCommand = new Command();
  let commandSpy;
  let descriptionSpy;
  let optionSpy;
  let actionSpy;

  const mockMetadata: ModuleMetadata = {
    description: 'bar',
    name: 'foo',
    options: [
      {
        flags: '-x --xval ',
        description: 'mock value',
      },
      {
        flags: '-y --yval ',
        description: 'mock value 2',
      },
    ],
  };

  const mockAction = mock();

  beforeAll(() => {
    commandSpy = spyOn(mockCommand, 'command');
    commandSpy.mockReturnValue(mockCommand);

    descriptionSpy = spyOn(mockCommand, 'description');
    descriptionSpy.mockReturnValue(mockCommand);

    optionSpy = spyOn(mockCommand, 'option');
    optionSpy.mockReturnValue(mockCommand);

    actionSpy = spyOn(mockCommand, 'action');
    actionSpy.mockReturnValue(mockCommand);
  });

  afterEach(() => {
    commandSpy.mockClear();
    descriptionSpy.mockClear();
    optionSpy.mockClear();
    actionSpy.mockClear();
  });

  it('Should call command spy with the provided name', () => {
    addModuleToProgram(mockCommand, mockMetadata, mockAction);

    expect(commandSpy).toHaveBeenCalledTimes(1);
    expect(commandSpy).toHaveBeenCalledWith(mockMetadata.name);
  });

  it('Should call description spy with the provided description', () => {
    addModuleToProgram(mockCommand, mockMetadata, mockAction);

    expect(descriptionSpy).toHaveBeenCalledTimes(1);
    expect(descriptionSpy).toHaveBeenCalledWith(mockMetadata.description);
  });

  it('Should call option spy with the provided options', () => {
    addModuleToProgram(mockCommand, mockMetadata, mockAction);

    expect(optionSpy).toHaveBeenCalledTimes(2);
    expect(optionSpy).toHaveBeenCalledWith(
      mockMetadata.options[0].flags,
      mockMetadata.options[0].description,
      mockMetadata.options[0].defaultValue,
    );
    expect(optionSpy).toHaveBeenCalledWith(
      mockMetadata.options[1].flags,
      mockMetadata.options[1].description,
      mockMetadata.options[1].defaultValue,
    );
  });
});
