package congvanservice.services;

import congvanservice.models.LoaiCongVan;

import java.util.List;
import java.util.Optional;

public interface LoaiCongVanService {
    //CRUD
    Optional<LoaiCongVan> findLoaiCongVanById(Integer id);
    LoaiCongVan saveLoaiCongVan(LoaiCongVan loaiCongVan);
    LoaiCongVan updateLoaiCongVan(LoaiCongVan loaiCongVan);
    void deleteLoaiCongVan(Integer id);
    //Other
    List<LoaiCongVan> findAll();
}
