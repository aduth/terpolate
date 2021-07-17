import { JSXElementConstructor, Key, ReactNode } from 'react';

export function jsx<T extends string | JSXElementConstructor<any>, P>(
	type: T,
	props: P,
	key: Key | null
): ReactNode[];
