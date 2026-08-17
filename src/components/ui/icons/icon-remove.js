import IconImage from 'lego-framework/src/components/IconImage';
import iconCloseRound from '../../../assets/web/icons/cross-round.svg';

export default {
    name: 'icon-remove',
    extends: IconImage,
    props: {
        image: { type: String, default: iconCloseRound },
        cursorPointer: { type: Boolean, default: true }
    }
};
