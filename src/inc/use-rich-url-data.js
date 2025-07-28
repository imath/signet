/**
 * WP dependencies.
 */
import { __experimentalFetchUrlData as fetchUrlData } from '@wordpress/core-data';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';
import { useEffect, useReducer } from '@wordpress/element';

/**
 * Resolves URL Rich Data.
 *
 * Copy/pasted from Block Editor's link-control.
 *
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
function reducer( state, action ) {
	switch ( action.type ) {
		case 'RESOLVED':
			return {
				...state,
				isFetching: false,
				richData: action.richData,
			};
		case 'ERROR':
			return {
				...state,
				isFetching: false,
				richData: null,
			};
		case 'LOADING':
			return {
				...state,
				isFetching: true,
			};
		default:
			throw new Error( `Unexpected action type ${ action.type }` );
	}
}

/**
 * Gets URL Rich Data.
 *
 * Adapted from Block Editor's link-control.
 *
 * @param {string} url
 * @returns {object}
 */
function useRichUrlData( url, setAttributes, attributes ) {
	const [ state, dispatch ] = useReducer( reducer, {
		richData: null,
		isFetching: false,
	} );

	useEffect( () => {
		if ( url && url.length ) {
			dispatch( {
				type: 'LOADING',
			} );

			const controller = new window.AbortController();

			const signal = controller.signal;

			fetchUrlData( url, {
				signal,
			} ).then( ( urlData ) => {
				const { title, image, description } = urlData;
				setAttributes( {
					title: !! attributes.title ? stripHTML( attributes.title ) : stripHTML( title ),
					image: !! attributes.image ?  attributes.image : image,
					description: !! attributes.description ? stripHTML( attributes.description ) : stripHTML( description ),
				} );

				dispatch( {
					type: 'RESOLVED',
					richData: urlData,
				} );
			} ).catch( () => {
				if ( ! signal.aborted ) {
					dispatch( {
						type: 'ERROR',
					} );
				}
			} );

			return () => {
				controller.abort();
			};
		}
	}, [ url, setAttributes, attributes ] );

	return state;
}

export default useRichUrlData;
