/**
 * WP dependencies.
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Transforms for Signet block.
 */
const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/embed' ],
			transform( attributes ) {
				return createBlock( 'imath/signet', {
					url: attributes.url,
					title: '',
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/embed' ],
			transform( attributes ) {
				return createBlock( 'core/embed', {
					url: attributes.url,
				} );
			},
		}
	],
};

export default transforms;
