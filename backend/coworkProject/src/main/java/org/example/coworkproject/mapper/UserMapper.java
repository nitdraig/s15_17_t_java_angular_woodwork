package org.example.coworkproject.mapper;

import org.example.coworkproject.dto.response.UserResponseDTO;
import org.example.coworkproject.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    UserResponseDTO userToUserResponseDTO(UserEntity user);
    List<UserResponseDTO> toUserResponseListDTO(List<UserEntity> users);

}
