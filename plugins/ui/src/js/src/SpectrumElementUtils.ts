import {
  Checkbox,
  Content,
  ContextualHelp,
  Flex,
  Grid,
  Heading,
  Icon,
  IllustratedMessage,
  Switch,
  Text,
  ToggleButton,
  View,
} from '@adobe/react-spectrum';
import { ValueOf } from '@deephaven/utils';
import { ActionButton, Slider, TextField } from './spectrum';
import { ELEMENT_KEY, ElementNode, isElementNode } from './ElementUtils';

export const SPECTRUM_ELEMENT_TYPE_PREFIX = 'deephaven.ui.spectrum.';

export const SpectrumSupportedTypes = {
  ActionButton,
  Checkbox,
  Content,
  ContextualHelp,
  Flex,
  Grid,
  Heading,
  Icon,
  IllustratedMessage,
  Slider,
  Switch,
  Text,
  TextField,
  ToggleButton,
  View,
} as const;

export type SpectrumElementName =
  `${typeof SPECTRUM_ELEMENT_TYPE_PREFIX}${keyof typeof SpectrumSupportedTypes}`;

/**
 * Describes a Spectrum element that can be rendered in the UI.
 * The type of Spectrum element loaded is the name of the element without the prefix.
 * For example, `deephaven.ui.spectrum.Text` will render the Text component.
 * The props are passed directly to the Spectrum component.
 * @see SpectrumSupportedTypes
 */
export type SpectrumElementNode = ElementNode & {
  [ELEMENT_KEY]: SpectrumElementName;
};

export function isSpectrumElementNode(
  obj: unknown
): obj is SpectrumElementNode {
  return (
    isElementNode(obj) &&
    (obj as SpectrumElementNode)[ELEMENT_KEY].startsWith(
      SPECTRUM_ELEMENT_TYPE_PREFIX
    )
  );
}

/**
 * Get the Spectrum Component for the element
 * @param name Name of the element
 * @returns The Spectrum Component name for the element
 */
export function getSpectrumComponent(
  name: SpectrumElementName
): ValueOf<typeof SpectrumSupportedTypes> {
  return SpectrumSupportedTypes[
    name.substring(
      SPECTRUM_ELEMENT_TYPE_PREFIX.length
    ) as keyof typeof SpectrumSupportedTypes
  ];
}