import formatNumber from "../../../utils/formatNumber";

const ProductBonus = ({ bonus }) => {
  return <p className="product-bonus">+{formatNumber(bonus.toString())} бонусов</p>;
};

export default ProductBonus;
