require 'rubygems'
require 'rmagick'
require 'pathname'

include Magick

THUMB_WIDTH = 92
THUMB_HEIGHT = 69

#
# Gets the thumb path given a full sized image path
#
def get_thumb_path img_path
  thumb_path = img_path.basename.to_s
  thumb_path[img_path.extname] = ".t" + img_path.extname 
  img_path.parent + thumb_path # thumb_path now a Pathname
end

#
# Gets full size image count
#
def get_full_size_image_paths
  images = Dir.glob("../img/portfolio/*/*").map { |path| Pathname.new path }.select do |path|
    path.file? && [".jpg",".png",".gif"].include?(path.extname.downcase)
  end

  images.select do |img|
    !img.basename.to_s.include? ".t."
  end  
end


get_full_size_image_paths().each do |img_path|
  puts "creating thumbnail for #{img_path}"
  
  img =  Image.read(img_path).first
  c = img.columns, r = img.rows
  thumb = img.thumbnail THUMB_WIDTH, THUMB_HEIGHT
  thumb.write(get_thumb_path(img_path).to_s)
end

