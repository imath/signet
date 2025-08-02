/**
 * The Signet block.
 *
 * @author imath.
 * @since  1.0.0
 */

/**
 * WP dependencies.
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import './index.scss';
import metadata from './block.json';
import { ReactComponent as IconSignet } from './assets/icon.svg';
import EditSignet from './inc/edit';
import SaveSignet from './inc/save';
import transforms from './inc/transforms';

// Registers the Signet block.
registerBlockType( metadata, {
	icon: IconSignet,
	edit: EditSignet,
	save: SaveSignet,
	transforms: transforms,
} );
