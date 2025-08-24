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
import { __ } from '@wordpress/i18n';

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
	example: {
		attributes: {
			url: __( 'https://retraceur.github.io', 'signet' ),
			image: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/retraceur/retraceur.github.io/refs/heads/main/src/assets/retraceur-docs-og.png',
			title: __( 'Retraceur documentation site', 'signet' ),
			description: __( 'Your personal online publication hub, powered by PHP.', 'signet' ),
		}
	},
	edit: EditSignet,
	save: SaveSignet,
	transforms: transforms,
} );
