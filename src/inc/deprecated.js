/**
 * WP dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';
import { __, isRTL } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from '../block.json';

const { attributes: blockAttributes } = metadata;

const v2 = {
	attributes: blockAttributes,
	save( { attributes } ) {
		const blockProps = useBlockProps.save();
		const { url, image, title, description } = attributes;
		const titleOutput = (
			<a
				href={ url }
				className="components-external-link signet-url"
				target="_blank"
				rel="external noreferrer noopener"
			>
				<span class="components-external-link__contents">
					<span className="signet-title">
						{ title ? stripHTML( title ) : __( 'Open link', 'signet' ) }
					</span>
				</span>
				<span
					class="components-external-link__icon"
					aria-label={
						/* translators: accessibility text */
						__( '(opens in a new tab)', 'signet' )
					}
				>
					{ isRTL() ? '\u2196' : '\u2197' }
				</span>
			</a>
		);

		return (
			<div { ...blockProps }>
				{ !! image && (
					<div className="wp-block-media-text is-stacked-on-mobile">
						<figure className="wp-block-media-text__media signet-figure">
							<a href={ url } target="_blank" rel="noreferrer noopener">
								<img src={ image } alt="" />
							</a>
						</figure>
						<div className="wp-block-media-text__content">
							{ titleOutput }
							<p className="signet-description">{ stripHTML( description ) }</p>
						</div>
					</div>
				) }

				{ ! image && (
					<div className="signet-figure">
						{ titleOutput }
						<p className="signet-description">{ stripHTML( description ) }</p>
					</div>
				) }
			</div>
		);
	}
}

const deprecated = [ v2 ];

export default deprecated;
