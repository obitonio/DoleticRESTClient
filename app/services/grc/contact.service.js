(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ContactService', ContactService);

    ContactService.$inject = ['$http', 'SERVER_CONFIG'];

    function ContactService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/contact';
        var contactFactory = {};

        // GET
        contactFactory.getCurrentUserContacts = function (cache) {
            if (!cache) {
                delete contactFactory.currentUserContacts;
            } else if (contactFactory.currentUserContacts) {
                return;
            }
            return $http.get(server + urlBase + "s/current", {cache: cache}).success(function(data) {
                contactFactory.currentUserContacts = data.contacts;
            }).error(function(data) {
                console.log(data);
            });
        };

        contactFactory.getAllContactsByFirm = function (firm, cache) {
            if (!cache) {
                delete contactFactory.firmContacts;
            } else if (contactFactory.firmContacts) {
                return;
            }
            return $http.get(server + urlBase + "s/firm/" + firm).success(function (data) {
                contactFactory.firmContacts = data.contacts;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.getAllProspects = function (cache) {
            if (!cache) {
                delete contactFactory.prospects;
            } else if (contactFactory.prospects) {
                return;
            }
            return $http.get(server + urlBase + "s/type/1").success(function (data) {
                contactFactory.prospects = data.contacts;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.getAllContactedProspects = function (cache) {
            if (!cache) {
                delete contactFactory.contactedProspects;
            } else if (contactFactory.contactedProspects) {
                return;
            }
            return $http.get(server + urlBase + "s/type/2").success(function (data) {
                contactFactory.contactedProspects = data.contacts;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.getAllClients = function (cache) {
            if (!cache) {
                delete contactFactory.clients;
            } else if (contactFactory.clients) {
                return;
            }
            return $http.get(server + urlBase + "s/type/3").success(function (data) {
                contactFactory.clients = data.contacts;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.getAllOldClients = function (cache) {
            if (!cache) {
                delete contactFactory.oldClients;
            } else if (contactFactory.oldClients) {
                return;
            }
            return $http.get(server + urlBase + "s/type/4").success(function (data) {
                contactFactory.oldClients = data.contacts;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.getContactDetails = function (id, cache) {
            if (!cache) {
                delete contactFactory.selectedContact;
            } else if (contactFactory.selectedContact && contactFactory.selectedContact.id === id) {
                return;
            }
            return $http.get(server + urlBase + "/" + id).success(function (data) {
                contactFactory.selectedContact = data.contact;
            }).error(function (data) {
                console.log(data);
            });
        };

        // POST
        contactFactory.postProspect = function (prospect) {
            prospect.type = 1;
            return $http.post(server + urlBase, prospect).success(function (data) {
                // If prospects does not exists, it is initialized as [] by default for some reason and this causes an error with ng-repeat in tables
                // Find a better fix ?
                contactFactory.prospects = angular.equals(contactFactory.prospects, []) ?
                    {} : contactFactory.prospects;
                contactFactory.prospects[data.contact.id] = data.contact;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.postContactedProspect = function (contactedProspect) {
            contactedProspect.type = 2;
            return $http.post(server + urlBase, contactedProspect).success(function (data) {
                contactFactory.contactedProspects = angular.equals(contactFactory.contactedProspects, []) ?
                    {} : contactFactory.contactedProspects;
                contactFactory.contactedProspects[data.contact.id] = data.contact;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.postClient = function (client) {
            client.type = 3;
            return $http.post(server + urlBase, client).success(function (data) {
                contactFactory.clients = angular.equals(contactFactory.clients, []) ?
                    {} : contactFactory.clients;
                contactFactory.clients[data.contact.id] = data.contact;
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.postOldClient = function (oldClient) {
            oldClient.type = 4;
            return $http.post(server + urlBase, oldClient).success(function (data) {
                contactFactory.oldClients = angular.equals(contactFactory.oldClients, []) ?
                    {} : contactFactory.oldClients;
                contactFactory.oldClients[data.contact.id] = data.contact;
            }).error(function (data) {
                console.log(data);
            });
        };

        // PUT
        contactFactory.putProspect = function (prospect) {
            return $http.post(server + urlBase + "/" + prospect.id, prospect).success(function (data) {
                contactFactory.prospects[data.contact.id] = data.contact;
                if (contactFactory.selectedContact && data.contact.id == contactFactory.selectedContact.id) {
                    contactFactory.selectedContact = data.contact;
                }
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.putContactedProspect = function (contactedProspect) {
            return $http.post(server + urlBase + "/" + contactedProspect.id, contactedProspect).success(function (data) {
                contactFactory.contactedProspects[data.contact.id] = data.contact;
                if (contactFactory.selectedContact && data.contact.id == contactFactory.selectedContact.id) {
                    contactFactory.selectedContact = data.contact;
                }
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.putClient = function (client) {
            return $http.post(server + urlBase + "/" + client.id, client).success(function (data) {
                contactFactory.clients[data.contact.id] = data.contact;
                if (contactFactory.selectedContact && data.contact.id == contactFactory.selectedContact.id) {
                    contactFactory.selectedContact = data.contact;
                }
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.putOldClient = function (oldClient) {
            return $http.post(server + urlBase + "/" + oldClient.id, oldClient).success(function (data) {
                contactFactory.oldClients[data.contact.id] = data.contact;
                if (contactFactory.selectedContact && data.contact.id == contactFactory.selectedContact.id) {
                    contactFactory.selectedContact = data.contact;
                }
            }).error(function (data) {
                console.log(data);
            });
        };

        // PUT - TYPE
        contactFactory.prospectToContactedProspect = function (prospect) {
            return $http.post(server + urlBase + "/" + prospect.id + "/type/2").success(function (data) {
                if (contactFactory.contactedProspects) {
                    contactFactory.contactedProspects = angular.equals(contactFactory.contactedProspects, []) ?
                        {} : contactFactory.contactedProspects;
                    contactFactory.contactedProspects[data.contact.id] = data.contact;
                }
                delete contactFactory.prospects[data.contact.id];
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.contactedProspectToProspect = function (contactedProspect) {
            return $http.post(server + urlBase + "/" + contactedProspect.id + "/type/1").success(function (data) {
                if (contactFactory.prospects) {
                    contactFactory.prospects = angular.equals(contactFactory.prospects, []) ?
                        {} : contactFactory.prospects;
                    contactFactory.prospects[data.contact.id] = data.contact;
                }
                delete contactFactory.contactedProspects[data.contact.id];
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.contactedProspectToClient = function (contactedProspect) {
            return $http.post(server + urlBase + "/" + contactedProspect.id + "/type/3").success(function (data) {
                if (contactFactory.clients) {
                    contactFactory.clients = angular.equals(contactFactory.clients, []) ?
                        {} : contactFactory.clients;
                    contactFactory.clients[data.contact.id] = data.contact;
                }
                delete contactFactory.contactedProspects[data.contact.id];
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.clientToOldClient = function (client) {
            return $http.post(server + urlBase + "/" + client.id + "/type/4").success(function (data) {
                if (contactFactory.oldClients) {
                    contactFactory.oldClients = angular.equals(contactFactory.oldClients, []) ?
                        {} : contactFactory.oldClients;
                    contactFactory.oldClients[data.contact.id] = data.contact;
                }
                delete contactFactory.clients[data.contact.id];
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.oldClientToClient = function (oldClient) {
            return $http.post(server + urlBase + "/" + oldClient.id + "/type/3").success(function (data) {
                if (contactFactory.clients) {
                    contactFactory.clients = angular.equals(contactFactory.clients, []) ?
                        {} : contactFactory.clients;
                    contactFactory.clients[data.contact.id] = data.contact;
                }
                delete contactFactory.oldClients[data.contact.id];
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.oldClientToProspect = function (oldClient) {
            return $http.post(server + urlBase + "/" + oldClient.id + "/type/1").success(function (data) {
                if (contactFactory.prospects) {
                    contactFactory.prospects = angular.equals(contactFactory.prospects, []) ?
                        {} : contactFactory.prospects;
                    contactFactory.prospects[data.contact.id] = data.contact;
                }
                delete contactFactory.oldClients[data.contact.id];
            }).error(function (data) {
                console.log(data);
            });
        };

        // DELETE
        contactFactory.deleteProspect = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete contactFactory.prospects[id];
                if (contactFactory.selectedContact && id === contactFactory.selectedContact.id) {
                    delete contactFactory.selectedContact;
                }
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.deleteContactedProspect = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete contactFactory.contactedProspects[id];
                if (contactFactory.selectedContact && id === contactFactory.selectedContact.id) {
                    delete contactFactory.selectedContact;
                }
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.deleteClient = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete contactFactory.clients[id];
                if (contactFactory.selectedContact && id === contactFactory.selectedContact.id) {
                    delete contactFactory.selectedContact;
                }
            }).error(function (data) {
                console.log(data);
            });
        };

        contactFactory.deleteOldClient = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete contactFactory.oldClients[id];
                if (contactFactory.selectedContact && id === contactFactory.selectedContact.id) {
                    delete contactFactory.selectedContact;
                }
            }).error(function (data) {
                console.log(data);
            });
        };

        return contactFactory;
    }

})();