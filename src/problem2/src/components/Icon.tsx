import { useEffect, useState } from "react";

const Icon = ({ name }: { name: string }) => {
  const [SvgIcon, setSvgIcon] = useState(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const icon = (await import(`../../public/tokens/${name}.svg`)).default;
        console.log(icon);
        setSvgIcon(icon);
      } catch (error) {
        console.log(error);
        setSvgIcon(null);
      }
    };

    loadIcon();
  }, [name]);

  if (!SvgIcon) {
    return null;
  }

  return <img src={SvgIcon} width={24} height={24} />;
};

export default Icon;
