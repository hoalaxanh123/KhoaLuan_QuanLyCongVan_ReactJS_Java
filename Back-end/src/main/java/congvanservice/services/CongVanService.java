package congvanservice.services;

import congvanservice.models.CongVan;

import java.util.List;
import java.util.Optional;

public interface CongVanService {
    //CRUD
    Optional<CongVan> findCongVanById(Integer id);
    CongVan saveCongVan(CongVan congVan);
    CongVan updateCongVan(CongVan congVan);
    void deleteCongVan(Integer id);
    //Other
    List<CongVan> findAll();
}
