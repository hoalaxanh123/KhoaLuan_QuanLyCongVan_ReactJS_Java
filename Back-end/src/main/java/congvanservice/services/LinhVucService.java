package congvanservice.services;

import congvanservice.models.LinhVuc;

import java.util.List;
import java.util.Optional;

public interface LinhVucService {
    //CRUD
    Optional<LinhVuc> findLinhVucById(Integer maLinhVuc);
    LinhVuc saveLinhVuc(LinhVuc linhVuc);
    LinhVuc updateLinhVuc(LinhVuc linhVuc);
    void deleteLinhVuc(Integer maLinhVuc);
    //Other
    List<LinhVuc> findAll();
}
