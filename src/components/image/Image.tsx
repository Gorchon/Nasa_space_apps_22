import { Box, ChakraComponent } from '@chakra-ui/react';
import NextImage, { ImageProps } from 'next/image';
import { ComponentProps } from 'react';

interface ChakraNextImageProps
  extends ComponentProps<ChakraComponent<'div', {}>> {
  nextProps?: Partial<ImageProps>;
}

export function Image(props: ChakraNextImageProps) {
  const { src, alt, nextProps, ...rest } = props;
  return (
    <Box overflow={'hidden'} position="relative" {...rest}>
      <NextImage
        objectFit="fill"
        layout="fill"
        src={src}
        alt={alt}
        {...(nextProps || {})}
      />
    </Box>
  );
}
